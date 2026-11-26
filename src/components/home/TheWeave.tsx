import Image from "next/image";
import { weave } from "@/content/home";
import { ParallaxImage } from "@/components/ui/primitives";
import ZariBorder from "./ZariBorder";

/**
 * Section / The Weave — four chapters, each a simple row:
 * square image on the left, text on the right (stacked on phones).
 */
export default function TheWeave() {
  return (
    <section
      id="the-weave"
      data-weave
      className="relative mt-section bg-panel pt-section text-bg"
      aria-labelledby="weave-title"
    >
      <div className="container-x">
        {/* Intro */}
        <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-[clamp(40px,5.5vw,80px)]">
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
            <div className="relative size-[96px]">
              <Image src="/images/motif-annam.png" alt="" fill sizes="96px" className="object-contain" />
            </div>
            <p className="t-body-l" data-reveal>
              {weave.body}
            </p>
          </div>
        </div>

        {/* Chapters: image left, text right */}
        <div className="mt-section flex flex-col gap-section-sm">
          {weave.chapters.map((c) => (
            <article
              key={c.title}
              className="grid gap-7 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-[clamp(40px,5.5vw,80px)]"
            >
              <div data-clip className="overflow-hidden rounded-2xl">
                <ParallaxImage src={c.image} alt="" sizes="(min-width: 768px) 45vw, 100vw" amount={6}>
                  <div className="aspect-square" />
                </ParallaxImage>
              </div>
              <div className="flex max-w-[440px] flex-col items-start gap-5" data-stagger>
                <p className="t-label text-gold">{c.numeral}</p>
                <h3 className="t-heading-l">{c.title}</h3>
                <div className="h-px w-16 origin-left bg-gold" data-rule />
                <p className="t-body-l">{c.body}</p>
                <p className="t-label text-gold">{c.meta}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-section-sm flex justify-center">
          <div className="relative size-[112px]">
            <Image src="/images/motif-mango.png" alt="" fill sizes="112px" className="object-contain" />
          </div>
        </div>
      </div>

      <ZariBorder variant="checks" className="mt-section-sm" />
    </section>
  );
}
