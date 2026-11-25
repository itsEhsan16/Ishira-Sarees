import { Fragment } from "react";
import { materials } from "@/content/home";
import { DiamondIcon } from "@/components/ui/primitives";

/** Figma 77:1636 — Section / Woven With */
export default function WovenWith() {
  return (
    <section className="flex flex-col items-center gap-7 py-14" aria-label="Woven with">
      <p className="t-label text-muted" data-reveal>
        Woven with
      </p>
      <ul
        className="container-x flex flex-wrap items-center justify-center gap-x-[clamp(18px,3.05vw,44px)] gap-y-4"
        data-stagger
      >
        {materials.map((m, i) => (
          <Fragment key={m}>
            <li className="font-display text-[clamp(27px,2.5vw,36px)] leading-none tracking-[0.01em] text-primary">{m}</li>
            {i < materials.length - 1 && (
              <li aria-hidden data-diamond>
                <DiamondIcon />
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
