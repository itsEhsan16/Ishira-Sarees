import Image from "next/image";
import { instagram } from "@/content/home";

/** Figma 77:1764 — Section / Instagram */
export default function Instagram() {
  return (
    <section className="flex flex-col items-center gap-9 overflow-hidden py-[clamp(72px,6.94vw,100px)]" aria-label="Instagram">
      <a href={instagram.href} className="t-label link-u text-ink" target="_blank" rel="noreferrer" data-reveal>
        {instagram.label}
      </a>
      <ul className="container-x flex items-center justify-center gap-[clamp(10px,1.39vw,20px)]">
        {instagram.tiles.map((t, i) => (
          <li
            key={t.src + i}
            data-float={t.tall ? -1 : 1}
            className={`relative shrink-0 overflow-hidden rounded-[14px] ${t.tall ? "aspect-[256/300]" : "aspect-square"} w-[clamp(120px,17.78vw,256px)] ${
              i === 0 || i === 4 ? "max-sm:hidden" : ""
            }`}
          >
            <a href={instagram.href} target="_blank" rel="noreferrer" className="group absolute inset-0" aria-label="View on Instagram">
              <Image
                src={t.src}
                alt=""
                fill
                sizes="(min-width: 1440px) 256px, 30vw"
                className="object-cover transition-transform duration-[1.4s] ease-(--ease-silk) group-hover:scale-[1.07]"
              />
            </a>
          </li>
        ))}
      </ul>
      <p className="t-heading-italic container-x text-center text-aubergine" data-split="lines">
        {instagram.line}
      </p>
    </section>
  );
}
