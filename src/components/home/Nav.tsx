"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/home";
import { LogoLockup } from "@/components/ui/primitives";
import { useLenis } from "@/components/motion/SmoothScroll";

/** Figma 77:1612 — Section / Nav */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  return (
    <header className="container-x flex flex-col items-center gap-1 pb-2 pt-[22px]" data-hero-nav>
      <nav className="t-ui flex w-full items-center justify-between text-ink" aria-label="Primary">
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

      <Link href="/" aria-label="Ishira — home" className="mt-1" data-hero-logo>
        <LogoLockup />
      </Link>

      <div className="t-label flex w-full flex-col items-center gap-2 text-center text-plum md:flex-row md:justify-between md:text-left">
        <p data-hero-tag="left">{nav.taglineLeft}</p>
        <p data-hero-tag="right">{nav.taglineRight}</p>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-plum-deep px-5 pb-10 pt-6 text-bg transition-[clip-path] duration-700 ease-(--ease-silk) md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        inert={!open}
      >
        <div className="t-ui flex justify-between">
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
    </header>
  );
}
