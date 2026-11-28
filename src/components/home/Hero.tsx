import { hero } from "@/content/home";
import { ParallaxImage, PillButton } from "@/components/ui/primitives";

/** Figma 77:1627 — Section / Hero */
export default function Hero() {
  return (
    <section className="container-x pt-8" aria-labelledby="hero-title">
      <div data-hero-frame className="relative overflow-hidden rounded-[24px]">
        <ParallaxImage
          src={hero.image}
          alt="A deep red Kanjivaram saree with a gold peacock zari border draped over a carved wooden chair"
          sizes="(min-width: 1440px) 1360px, 100vw"
          priority
          amount={10}
          className="h-[min(680px,82svh)] min-h-[560px] md:h-[clamp(500px,44vw,640px)]"
          imgClassName="object-[70%_50%] md:object-center"
        >
          {/* readability wash on small screens only — the desktop image has a clear left field */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f6e6cf]/85 via-[#f6e6cf]/40 to-transparent md:hidden" />
          <div className="absolute left-6 right-6 top-14 flex flex-col items-start gap-6 md:left-[5.3%] md:right-auto md:top-[12%]" data-hero-copy>
            <p className="t-label text-primary">{hero.label}</p>
            <h1 id="hero-title" className="t-display-hero text-dark" data-hero-title>
              {hero.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="t-body-l max-w-[360px] text-ink">{hero.body}</p>
            <PillButton href={hero.cta.href}>{hero.cta.label}</PillButton>
          </div>
        </ParallaxImage>
      </div>
    </section>
  );
}
