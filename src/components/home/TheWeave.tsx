import Image from "next/image";
import { weave } from "@/content/home";
import { ParallaxImage } from "@/components/ui/primitives";
import ZariBorder from "./ZariBorder";

/** Figma 77:1689 — Section / The Weave (dark chapter story) */
export default function TheWeave() {
  return (
    <section
      id="the-weave"
      data-weave
      className="relative flex flex-col items-center gap-[clamp(72px,7.64vw,110px)] bg-dark pt-[clamp(88px,9vw,130px)] text-bg"
      aria-labelledby="weave-title"
    >
      {/* Intro */}
      <div className="container-x flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-start gap-6">
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
        <div className="flex max-w-[440px] flex-col items-start gap-5">
          <div className="relative size-[120px]">
            <Image src="/images/motif-annam.png" alt="" fill sizes="120px" className="object-contain" />
          </div>
          <p className="t-body-l" data-reveal>
            {weave.body}
          </p>
        </div>
      </div>

      {/* Chapters */}
      {weave.chapters.map((c) => (
        <article
          key={c.title}
          className={`container-x flex flex-col items-center justify-center gap-10 lg:gap-[clamp(48px,6.67vw,96px)] ${
            c.imageFirst ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          <div
            data-clip
            className="w-full overflow-hidden rounded-2xl lg:w-(--w) lg:shrink-0"
            style={{ ["--w" as string]: `min(${c.size.w}px, ${((c.size.w / 1440) * 100).toFixed(2)}vw)` }}
          >
            <ParallaxImage
              src={c.image}
              alt=""
              sizes={`(min-width: 1024px) ${c.size.w}px, 100vw`}
              amount={7}
              className="w-full"
              imgClassName="rounded-2xl"
            >
              <div style={{ aspectRatio: `${c.size.w} / ${c.size.h}` }} />
            </ParallaxImage>
          </div>
          <div className="flex w-full max-w-[440px] flex-col items-start gap-[22px]" data-stagger>
            <p className="t-label text-gold">{c.numeral}</p>
            <h3 className="t-heading-l">{c.title}</h3>
            <div className="h-px w-16 origin-left bg-gold" data-rule />
            <p className="t-body-l">{c.body}</p>
            <p className="t-label text-gold">{c.meta}</p>
          </div>
        </article>
      ))}

      <div className="relative size-[140px]">
        <Image src="/images/motif-mango.png" alt="" fill sizes="140px" className="object-contain" />
      </div>

      <ZariBorder variant="checks" />
    </section>
  );
}
