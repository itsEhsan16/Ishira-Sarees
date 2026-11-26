"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { bestsellers } from "@/content/home";
import { ArrowIcon, SectionHeader } from "@/components/ui/primitives";
import ProductCard from "@/components/ui/ProductCard";

/** Figma 77:1652 — Section / Bestsellers (carousel) */
export default function Bestsellers() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // Where the last click is heading, so quick repeated clicks add up instead
  // of restarting from the mid-animation position.
  const target = useRef<number | null>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const stride = card.offsetWidth + 16;
    const max = el.scrollWidth - el.clientWidth;
    const from = target.current ?? el.scrollLeft;
    const next = Math.max(0, Math.min(max, Math.round(from / stride + dir) * stride));
    target.current = next;
    el.scrollTo({ left: next, behavior: "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const done = () => (target.current = null);
    el.addEventListener("scrollend", done);
    // a touch/trackpad drag takes over from any pending arrow target
    el.addEventListener("pointerdown", done);
    return () => {
      el.removeEventListener("scrollend", done);
      el.removeEventListener("pointerdown", done);
    };
  }, []);

  return (
    <section className="container-x flex flex-col items-start gap-7 py-10" aria-labelledby="bestsellers-label">
      <SectionHeader label="(02) Bestsellers" link={{ label: "View Shop", href: "/shop" }} />
      <h2 id="bestsellers-label" className="sr-only">
        Bestsellers
      </h2>
      <ul
        ref={track}
        onScroll={update}
        className="-mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] md:mx-0 md:w-full md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        data-stagger
      >
        {bestsellers.map((p, i) => (
          <li
            key={p.slug}
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)]"
          >
            <ProductCard product={p} priority={i < 2} />
          </li>
        ))}
      </ul>
      <div className="flex gap-2.5" data-reveal>
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === -1 ? "Previous sarees" : "Next sarees"}
            onClick={() => step(dir)}
            disabled={dir === -1 ? edge.start : edge.end}
            className="group grid size-[42px] place-items-center rounded-full border border-ink transition-[background-color,opacity] duration-500 hover:bg-ink/6 disabled:opacity-35"
          >
            <ArrowIcon
              flip={dir === -1}
              className={`transition-transform duration-500 ease-(--ease-silk) ${
                dir === -1 ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
