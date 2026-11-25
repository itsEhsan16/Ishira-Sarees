import { banner } from "@/content/home";
import { ParallaxImage } from "@/components/ui/primitives";

/** Figma 77:1734 — Section / Banner */
export default function Banner() {
  return (
    <section className="container-x" aria-label={banner.title}>
      <div data-expand className="overflow-hidden rounded-[24px]">
        <ParallaxImage
          src={banner.image}
          alt="Close-up of gold zari peacocks woven into a deep red silk border"
          sizes="(min-width: 1440px) 1360px, 100vw"
          amount={12}
          className="aspect-[4/5] sm:aspect-[1360/640]"
        >
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-[rgba(30,6,7,0)] to-[rgba(30,6,7,0.6)]" />
          <div className="absolute inset-x-6 bottom-8 flex flex-col gap-4 text-bg md:inset-x-14 md:bottom-[9%] md:flex-row md:items-end md:justify-between">
            <p
              className="font-serif text-[clamp(44px,5vw,72px)] font-normal italic leading-[0.95] tracking-[-0.015em]"
              data-split="lines"
            >
              {banner.title}
            </p>
            <p className="t-label md:mb-[10px]" data-reveal>
              {banner.label}
            </p>
          </div>
        </ParallaxImage>
      </div>
    </section>
  );
}
