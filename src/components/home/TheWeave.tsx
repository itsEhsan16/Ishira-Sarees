"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { weave } from "@/content/home";
import { ParallaxImage } from "@/components/ui/primitives";
import ZariBorder from "./ZariBorder";

/**
 * Section / The Weave — one row: the chapter image on the left, the four
 * chapters on the right. Clicking a chapter opens its text and cross-fades
 * the image. Stacks (image above list) on phones.
 */
export default function TheWeave() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const count = weave.chapters.length;

  // Up/Down (and Home/End) move between chapters, like a vertical tab list.
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next =
      e.key === "ArrowDown" ? (i + 1) % count
      : e.key === "ArrowUp" ? (i - 1 + count) % count
      : e.key === "Home" ? 0
      : e.key === "End" ? count - 1
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <section
      id="the-weave"
      data-weave
      className="relative mt-section bg-panel pt-section text-bg"
      aria-labelledby="weave-title"
    >
      <div className="container-x">
        {/* Intro */}
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-[clamp(40px,5.5vw,80px)]">
          <div className="flex flex-col items-start gap-5">
            <p className="t-label text-gold" data-reveal>
              {weave.label}
            </p>
            <h2 id="weave-title" className="t-display-xl" data-split="lines">
              {weave.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <div className="flex max-w-[440px] flex-col items-start gap-4">
            <div className="relative size-[72px]">
              <Image src="/images/motif-annam.png" alt="" fill sizes="72px" className="object-contain" />
            </div>
            <p className="t-body-l" data-reveal>
              {weave.body}
            </p>
          </div>
        </div>

        {/* One row: image left, chapters right */}
        <div className="mt-section-sm grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-[clamp(40px,5.5vw,80px)]">
          <div data-clip className="relative aspect-square overflow-hidden rounded-2xl">
            {weave.chapters.map((c, i) => (
              <div
                key={c.title}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition-opacity duration-700 ease-(--ease-silk) ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <ParallaxImage
                  src={c.image}
                  alt=""
                  sizes="(min-width: 768px) 45vw, 100vw"
                  amount={6}
                  priority={false}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>

          <div className="border-t border-bg/15" data-stagger>
            {weave.chapters.map((c, i) => {
              const open = i === active;
              return (
                <div key={c.title} className="border-b border-bg/15">
                  <h3>
                    <button
                      ref={(el) => {
                        buttons.current[i] = el;
                      }}
                      type="button"
                      id={`weave-tab-${i}`}
                      aria-expanded={open}
                      aria-controls={`weave-panel-${i}`}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => onKey(e, i)}
                      className={`group flex w-full items-baseline gap-5 py-5 text-left transition-opacity duration-500 ${
                        open ? "opacity-100" : "opacity-60 hover:opacity-90"
                      }`}
                    >
                      <span className="t-label w-12 shrink-0 text-gold">{c.numeral}</span>
                      <span className="font-serif text-[clamp(28px,2.5vw,36px)] leading-[1.1]">{c.title}</span>
                    </button>
                  </h3>
                  {/* grid-rows 0fr → 1fr animates the panel open without measuring heights */}
                  <div
                    id={`weave-panel-${i}`}
                    role="region"
                    aria-labelledby={`weave-tab-${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-silk) ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden" inert={!open}>
                      <div className="flex max-w-[480px] flex-col items-start gap-4 pb-6 pl-[68px]">
                        <div className="h-px w-16 bg-gold" />
                        <p className="t-body-l">{c.body}</p>
                        <p className="t-label text-gold">{c.meta}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-section-sm flex justify-center">
          <div className="relative size-[88px]">
            <Image src="/images/motif-mango.png" alt="" fill sizes="88px" className="object-contain" />
          </div>
        </div>
      </div>

      <ZariBorder variant="checks" className="mt-section-sm" />
    </section>
  );
}
