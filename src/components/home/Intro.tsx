import Image from "next/image";
import { intro } from "@/content/home";

/** Figma 77:1671 — Section / Intro. Words fill from muted to ink on scroll. */
export default function Intro() {
  return (
    <section className="container-x flex flex-col items-start gap-6 pt-section" aria-label="Welcome">
      <div className="relative size-[88px]" data-spin-in>
        <Image src="/images/motif-peacock.png" alt="" fill sizes="88px" className="object-contain" />
      </div>
      <p className="t-statement max-w-[980px] text-muted" data-word-fill>
        <span className="text-ink">{intro.lead}</span>
        <span>{intro.rest}</span>
      </p>
    </section>
  );
}
