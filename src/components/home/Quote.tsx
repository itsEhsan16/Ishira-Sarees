import Image from "next/image";
import { quote } from "@/content/home";

/** Figma 77:1685 — Section / Quote */
export default function Quote() {
  return (
    <section className="container-x flex flex-col items-center gap-7 pb-[clamp(80px,8.33vw,120px)] pt-[clamp(72px,7.64vw,110px)]">
      <div className="relative h-[72px] w-[min(360px,80vw)]" data-draw>
        <Image src="/images/divider.png" alt="" fill sizes="360px" className="object-cover" />
      </div>
      <blockquote className="t-heading-italic max-w-[880px] text-center text-aubergine" data-split="lines">
        {quote.text}
      </blockquote>
      <p className="t-label text-muted" data-reveal>
        {quote.source}
      </p>
    </section>
  );
}
