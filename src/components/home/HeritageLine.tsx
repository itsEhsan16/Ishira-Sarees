import { heritageLine } from "@/content/home";

/** Figma 77:1732 — Section / Heritage Line */
export default function HeritageLine() {
  return (
    <section className="container-x pt-section">
      <p className="t-statement max-w-[1060px] text-muted" data-word-fill>
        <span className="text-primary">{heritageLine.lead}</span>
        <span>{heritageLine.rest}</span>
      </p>
    </section>
  );
}
