import { emirates } from "@/content/home";
import { ParallaxImage, PillButton } from "@/components/ui/primitives";

/** Figma 77:1739 — Section / Made for the Emirates + Care Row */
export default function MadeForEmirates() {
  return (
    <section className="container-x flex flex-col gap-section-sm pt-section" aria-labelledby="emirates-title">
      <div data-expand className="overflow-hidden rounded-[24px]">
        <ParallaxImage
          src={emirates.image}
          alt=""
          sizes="(min-width: 1440px) 1360px, 100vw"
          amount={10}
          className="flex min-h-[620px] items-center justify-center px-4 py-16 md:h-[clamp(560px,43vw,620px)]"
        >
          <div className="absolute inset-0 bg-tint-mural opacity-75 mix-blend-color" />
          <div
            data-card-rise
            className="relative flex max-w-[564px] flex-col items-center gap-[22px] rounded-[20px] bg-bg px-6 py-11 text-center md:p-[52px]"
          >
            <p className="t-label text-primary">{emirates.label}</p>
            <h2 id="emirates-title" className="t-heading-l max-w-[460px] text-dark">
              {emirates.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="t-body-m max-w-[420px] text-ink">{emirates.body}</p>
            <PillButton href={emirates.cta.href} variant="outline">
              {emirates.cta.label}
            </PillButton>
          </div>
        </ParallaxImage>
      </div>

      <div className="relative pt-9">
        <div className="absolute inset-x-0 top-0 h-px origin-left bg-ink" data-rule />
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {emirates.care.map((c) => (
            <li key={c.n} className="flex flex-col gap-2.5">
              <p className="t-label text-gold">{c.n}</p>
              <h3 className="t-title-card text-ink">{c.title}</h3>
              <p className="t-body-m max-w-[310px] text-ink">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
