import { heritageLine } from "@/content/home";

/** Figma 77:1732 — Section / Heritage Line */
export default function HeritageLine() {
  return (
    <section className="container-x pb-[clamp(72px,7.64vw,110px)] pt-[clamp(80px,8.33vw,120px)]">
      <p className="t-statement max-w-[1060px] text-muted" data-word-fill>
        <span className="text-primary">{heritageLine.lead}</span>
        <span>{heritageLine.rest}</span>
      </p>
    </section>
  );
}
