'use client';

/**
 * Adapted from React Bits' StaggeredMenu (https://reactbits.dev).
 *
 * Split in two so the toggle can live inside the (transformed) navbar header while the
 * panel stays a fixed, full-viewport sibling of it:
 *  - StaggeredMenuToggle: the "Menu / Close" text cycle + plus-to-cross icon
 *  - StaggeredMenuPanel: colour pre-layers, the panel, and the staggered item entrance
 * Both are controlled by the parent's `open` state.
 */

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* Toggle                                                              */
/* ------------------------------------------------------------------ */

interface ToggleProps {
  open: boolean;
  onToggle: () => void;
  labels: [menu: string, close: string];
  className?: string;
}

export function StaggeredMenuToggle({ open, onToggle, labels, className }: ToggleProps) {
  const [menuLabel, closeLabel] = labels;
  const iconRef = useRef<HTMLSpanElement>(null);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  // Until the first click there's nothing to roll through, so render the resting label only
  const [hasToggled, setHasToggled] = useState(false);

  // Roll through a few alternating labels before settling on the target one
  const textLines = useMemo(() => {
    const from = open ? menuLabel : closeLabel;
    const to = open ? closeLabel : menuLabel;
    if (!hasToggled) return [to];
    const seq = [from];
    let last = from;
    for (let i = 0; i < 3; i++) {
      last = last === menuLabel ? closeLabel : menuLabel;
      seq.push(last);
    }
    if (last !== to) seq.push(to);
    seq.push(to);
    return seq;
  }, [open, hasToggled, menuLabel, closeLabel]);

  useLayoutEffect(() => {
    gsap.set(plusHRef.current, { transformOrigin: '50% 50%', rotate: 0 });
    gsap.set(plusVRef.current, { transformOrigin: '50% 50%', rotate: 90 });
    gsap.set(iconRef.current, { transformOrigin: '50% 50%', rotate: 0 });
  }, []);

  useLayoutEffect(() => {
    if (!hasToggled) return;

    const icon = iconRef.current;
    const inner = textInnerRef.current;
    const reduce = prefersReducedMotion();

    if (icon) {
      gsap.to(icon, {
        rotate: open ? 225 : 0,
        duration: reduce ? 0 : open ? 0.8 : 0.35,
        ease: open ? 'power4.out' : 'power3.inOut',
        overwrite: 'auto',
      });
    }

    if (inner) {
      gsap.killTweensOf(inner);
      gsap.set(inner, { yPercent: 0 });
      gsap.to(inner, {
        yPercent: -((textLines.length - 1) / textLines.length) * 100,
        duration: reduce ? 0 : 0.5 + textLines.length * 0.07,
        ease: 'power4.out',
      });
    }
  }, [open, hasToggled, textLines]);

  return (
    <button
      type="button"
      className={`sm-toggle${className ? ` ${className}` : ''}`}
      aria-label={open ? closeLabel : menuLabel}
      aria-expanded={open}
      aria-controls="staggered-menu-panel"
      onClick={() => {
        setHasToggled(true);
        onToggle();
      }}
    >
      <span className="sm-toggle-textWrap" aria-hidden="true">
        <span ref={textInnerRef} className="sm-toggle-textInner">
          {textLines.map((l, i) => (
            <span className="sm-toggle-line" key={i}>
              {l}
            </span>
          ))}
        </span>
      </span>
      <span ref={iconRef} className="sm-icon" aria-hidden="true">
        <span ref={plusHRef} className="sm-icon-line" />
        <span ref={plusVRef} className="sm-icon-line" />
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Panel                                                               */
/* ------------------------------------------------------------------ */

export interface StaggeredMenuItem {
  label: string;
  href: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface PanelProps {
  open: boolean;
  items: StaggeredMenuItem[];
  position?: 'left' | 'right';
  colors?: string[];
  footer?: React.ReactNode;
  dir?: 'ltr' | 'rtl';
  className?: string;
}

export default function StaggeredMenuPanel({
  open,
  items,
  position = 'right',
  colors = ['#1e3a8a', '#2563eb'],
  footer,
  dir = 'ltr',
  className,
}: PanelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const tweenRef = useRef<gsap.core.Animation | null>(null);
  const offscreen = position === 'left' ? -100 : 100;

  const getEls = () => {
    const wrapper = wrapperRef.current!;
    const panel = panelRef.current!;
    return {
      layers: Array.from(wrapper.querySelectorAll<HTMLElement>('.sm-prelayer')),
      panel,
      labels: Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel')),
      numbers: Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-item')),
      footer: panel.querySelector<HTMLElement>('.sm-footer'),
    };
  };

  const resetContent = () => {
    const { labels, numbers, footer } = getEls();
    gsap.set(labels, { yPercent: 140, rotate: 10 });
    gsap.set(numbers, { '--sm-num-opacity': 0 });
    if (footer) gsap.set(footer, { y: 25, opacity: 0 });
  };

  // Park everything offscreen. `x: 0` matters: GSAP parses the CSS pre-hydration
  // translateX(100%) as a pixel `x` offset, which would otherwise stack on xPercent
  useLayoutEffect(() => {
    const { layers, panel } = getEls();
    gsap.set([...layers, panel], { x: 0, xPercent: offscreen });
    resetContent();
    return () => {
      tweenRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offscreen]);

  useEffect(() => {
    const { layers, panel, labels, numbers, footer } = getEls();
    tweenRef.current?.kill();

    if (prefersReducedMotion()) {
      gsap.set([...layers, panel], { xPercent: open ? 0 : offscreen });
      if (open) {
        gsap.set(labels, { yPercent: 0, rotate: 0 });
        gsap.set(numbers, { '--sm-num-opacity': 1 });
        if (footer) gsap.set(footer, { y: 0, opacity: 1 });
      } else {
        resetContent();
      }
      return;
    }

    if (!open) {
      tweenRef.current = gsap.to([...layers, panel], {
        xPercent: offscreen,
        duration: 0.32,
        ease: 'power3.in',
        overwrite: 'auto',
        onComplete: resetContent,
      });
      return;
    }

    resetContent();
    const tl = gsap.timeline();

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    const panelAt = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0;
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelAt,
    );

    const itemsAt = panelAt + panelDuration * 0.15;
    tl.to(
      labels,
      { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: 0.1 },
      itemsAt,
    );
    tl.to(
      numbers,
      { '--sm-num-opacity': 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 },
      itemsAt + 0.1,
    );
    if (footer) {
      tl.to(footer, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, panelAt + panelDuration * 0.4);
    }

    tweenRef.current = tl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, offscreen]);

  return (
    <div
      ref={wrapperRef}
      className={`staggered-menu-wrapper${className ? ` ${className}` : ''}`}
      data-position={position}
      data-open={open || undefined}
      dir={dir}
    >
      <div className="sm-prelayers" aria-hidden="true">
        {colors.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="sm-panel-inner">
          <ul className="sm-panel-list" role="list">
            {items.map((it) => (
              <li className="sm-panel-itemWrap" key={it.href}>
                <Link
                  className="sm-panel-item"
                  href={it.href}
                  onClick={it.onClick}
                  data-active={it.active || undefined}
                  aria-current={it.active ? 'page' : undefined}
                >
                  <span className="sm-panel-itemLabel">{it.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {footer && <div className="sm-footer">{footer}</div>}
        </nav>
      </aside>
    </div>
  );
}
