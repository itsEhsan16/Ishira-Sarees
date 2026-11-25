import Image from "next/image";
import { instagram } from "@/content/home";

/** Figma 77:1764 — Section / Instagram. Equal square posts, no scroll motion; a post grows on hover. */
export default function Instagram() {
  return (
    <section className="flex flex-col items-center gap-9 py-[clamp(72px,6.94vw,100px)]" aria-label="Instagram">
      <a href={instagram.href} className="t-label link-u text-ink" target="_blank" rel="noreferrer">
        {instagram.label}
      </a>
      <ul className="container-x grid grid-cols-3 gap-[clamp(10px,1.39vw,20px)] sm:grid-cols-5">
        {instagram.tiles.map((t, i) => (
          <li
            key={t.src + i}
            className={`relative aspect-square rounded-[14px] transition-transform duration-500 ease-(--ease-silk) hover:z-10 hover:scale-[1.08] focus-within:z-10 focus-within:scale-[1.08] ${
              i === 0 || i === 4 ? "max-sm:hidden" : ""
            }`}
          >
            <a
              href={instagram.href}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 overflow-hidden rounded-[14px] shadow-[0_0_0_rgba(30,6,7,0)] transition-shadow duration-500 hover:shadow-[0_18px_40px_-16px_rgba(30,6,7,0.45)]"
              aria-label="View on Instagram"
            >
              <Image src={t.src} alt="" fill sizes="(min-width: 640px) 20vw, 33vw" className="object-cover" />
            </a>
          </li>
        ))}
      </ul>
      <p className="t-heading-italic container-x text-center text-dark">{instagram.line}</p>
    </section>
  );
}
