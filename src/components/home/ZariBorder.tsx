/**
 * Repeating woven-border strip. Used for Figma 77:1634 (border-zari),
 * 77:1730 (border-checks, cocoa tint) and 77:1815 (footer zari).
 * Tile sizes match the Figma background-size; GSAP drifts background-position
 * with scroll velocity via [data-marquee].
 */
export default function ZariBorder({
  variant,
  className = "",
}: {
  variant: "zari" | "zari-footer" | "checks";
  className?: string;
}) {
  const conf = {
    zari: { src: "/images/border-zari.png", h: 64, tile: "221.905px 64px" },
    "zari-footer": { src: "/images/border-zari.png", h: 40, tile: "138.691px 40px" },
    checks: { src: "/images/border-checks.png", h: 56, tile: "308.301px 56px" },
  }[variant];

  return (
    <div
      aria-hidden
      data-marquee={variant === "checks" ? -1 : 1}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height: conf.h,
        backgroundImage: `url(${conf.src})`,
        backgroundSize: conf.tile,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "0 0",
      }}
    >
      {variant === "checks" && <div className="absolute inset-0 bg-tint-border opacity-85 mix-blend-color" />}
    </div>
  );
}
