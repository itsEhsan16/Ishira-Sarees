import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ---------- Icons (exact Figma SVG exports in /public/icons) ---------- */

type ArrowTone = "ink" | "ivory" | "oxblood" | "bg";
const arrowSrc: Record<ArrowTone, string> = {
  ink: "/icons/arrow.svg",
  ivory: "/icons/arrow-ivory.svg",
  oxblood: "/icons/arrow-oxblood.svg",
  bg: "/icons/arrow-bg.svg",
};

export function ArrowIcon({
  tone = "ink",
  className = "",
  flip = false,
}: {
  tone?: ArrowTone;
  className?: string;
  flip?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- 16px static SVG icon
    <img
      src={arrowSrc[tone]}
      alt=""
      width={16}
      height={16}
      aria-hidden
      className={`block size-4 shrink-0 ${flip ? "rotate-180" : ""} ${className}`}
    />
  );
}

export function DiamondIcon({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- 10px static SVG icon
    <img src="/icons/diamond.svg" alt="" width={10} height={10} aria-hidden className={`block size-2.5 shrink-0 ${className}`} />
  );
}

export function HeartIcon({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- 20px static SVG icon
    <img src="/icons/heart.svg" alt="" width={20} height={20} aria-hidden className={`block size-5 ${className}`} />
  );
}

/* ---------- Logo ---------- */

/** Brand emblem: transparent cut-out of the client logo (1565 × 920). */
export const EMBLEM = { src: "/images/logo-emblem.png", width: 1565, height: 920 };

export function Emblem({ className = "", priority, sizes }: { className?: string; priority?: boolean; sizes: string }) {
  return (
    <Image
      src={EMBLEM.src}
      alt=""
      width={EMBLEM.width}
      height={EMBLEM.height}
      priority={priority}
      sizes={sizes}
      className={`block h-auto w-full ${className}`}
    />
  );
}

/** Stacked emblem + ISHIRA wordmark (used in the footer). */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-[13px] ${className}`}>
      <div className="w-[min(429px,70vw)]">
        <Emblem sizes="(min-width: 768px) 430px, 70vw" />
      </div>
      <p className="t-brand whitespace-nowrap text-[clamp(48px,7.58vw,109.2px)]" aria-label="Ishira">
        ISHIRA
      </p>
    </div>
  );
}

/* ---------- Links & buttons ---------- */

export function ArrowLink({
  href,
  children,
  tone = "ink",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: ArrowTone;
  className?: string;
}) {
  return (
    <Link href={href} className={`t-ui group inline-flex items-center gap-2.5 ${className}`}>
      <span className="link-u">{children}</span>
      <ArrowIcon tone={tone} className="transition-transform duration-500 ease-(--ease-silk) group-hover:translate-x-1" />
    </Link>
  );
}

export function PillButton({
  variant = "primary",
  children,
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: "primary" | "outline" }) {
  const primary = variant === "primary";
  return (
    <Link
      {...props}
      className={`t-ui group relative inline-flex items-center gap-3.5 overflow-hidden rounded-full pl-7 pr-6 ${
        primary ? "bg-primary py-4 text-ivory" : "border border-primary py-[15px] text-oxblood"
      } ${className}`}
    >
      {/* fill sweep on hover */}
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-700 ease-(--ease-silk) group-hover:scale-y-100 ${
          primary ? "bg-primary" : "bg-primary/8"
        }`}
      />
      <span className="relative">{children}</span>
      <ArrowIcon
        tone={primary ? "ivory" : "oxblood"}
        className="relative transition-transform duration-500 ease-(--ease-silk) group-hover:translate-x-1"
      />
    </Link>
  );
}

export function SectionHeader({ label, link }: { label: string; link: { label: string; href: string } }) {
  return (
    <div className="flex w-full items-center justify-between" data-reveal>
      <p className="t-label text-ink">{label}</p>
      <ArrowLink href={link.href}>{link.label}</ArrowLink>
    </div>
  );
}

/* ---------- Image with scroll parallax ---------- */

export function ParallaxImage({
  src,
  alt = "",
  sizes,
  priority,
  className = "",
  amount = 8,
  children,
  imgClassName = "",
}: {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** percent of travel each way */
  amount?: number;
  children?: ReactNode;
  imgClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        data-parallax={amount}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${amount}%`, height: `${100 + amount * 2}%` }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
      </div>
      {children}
    </div>
  );
}
