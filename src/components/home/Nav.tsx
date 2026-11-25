"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/home";
import { Emblem } from "@/components/ui/primitives";
import { useLenis } from "@/components/motion/SmoothScroll";

/**
 * Figma 77:1612 — Section / Nav.
 * A fixed header bar holds the links. The brand (emblem + ISHIRA) starts large
 * and stacked under the bar; as you scroll, PageMotion glides it into a compact
 * row in the centre of the bar ([data-brand-*]).
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  return (
    <>
      {/* Fixed bar */}
      <header className="fixed inset-x-0 top-0 z-40 h-[72px]" data-hero-nav>
        <div aria-hidden data-header-bg className="absolute inset-0 border-b border-ink/10 bg-bg opacity-0" />
        <nav className="container-x t-nav relative flex h-full items-center justify-between text-ink" aria-label="Primary">
          <ul className="hidden gap-7 md:flex" data-hero-links>
            {nav.links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="link-u">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            data-hero-links
          >
            Menu
          </button>
          <ul className="flex gap-7" data-hero-links>
            {nav.actions.map((l, i) => (
              <li key={l.label} className={i < 2 ? "hidden md:block" : ""}>
                <Link href={l.href} className="link-u">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Brand layer — fixed once JS runs, absolute (scrolls away) without it */}
      <div className="brand-layer pointer-events-none inset-x-0 top-[43px] z-50 flex flex-col items-center gap-2.5" data-hero-nav>
        <Link
          href="/"
          aria-label="Ishira — home"
          className="pointer-events-auto block w-[min(330px,62vw)] origin-top-left will-change-transform"
          data-brand-emblem
        >
          <div data-brand-in>
            <Emblem priority sizes="(min-width: 768px) 330px, 62vw" />
          </div>
        </Link>
        <Link href="/" tabIndex={-1} aria-hidden className="pointer-events-auto block origin-top-left will-change-transform" data-brand-word>
          <p className="t-brand whitespace-nowrap text-[clamp(44px,5.83vw,84px)]" data-brand-in>
            ISHIRA
          </p>
        </Link>
      </div>

      {/* In-flow space the large brand occupies, then the tagline */}
      <div className="container-x pb-2">
        <div aria-hidden className="h-[calc(43px+min(330px,62vw)*920/1565+10px+clamp(44px,5.83vw,84px))]" />
        <div className="t-label mt-1 flex w-full flex-col items-center gap-2 text-center text-primary md:flex-row md:justify-between md:text-left">
          <p data-hero-tag="left">{nav.taglineLeft}</p>
          <p data-hero-tag="right">{nav.taglineRight}</p>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] flex flex-col bg-dark px-5 pb-10 pt-6 text-bg transition-[clip-path] duration-700 ease-(--ease-silk) md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        inert={!open}
      >
        <div className="t-nav flex justify-between">
          <span className="t-label text-gold">(Menu)</span>
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <ul className="mt-16 flex flex-col gap-5">
          {[...nav.links, ...nav.actions].map((l) => (
            <li key={l.label}>
              <Link href={l.href} onClick={() => setOpen(false)} className="t-display-xl block text-[44px]">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
