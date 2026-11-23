import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/primitives";

/** Figma component CollectionCard (instance 77:1682) — 442 × 600 */
export default function CollectionCard({
  slug,
  name,
  count,
  image,
}: {
  slug: string;
  name: string;
  count: number;
  image: string;
}) {
  return (
    <Link
      href={`/collections/${slug}`}
      className="group relative block aspect-[442/600] overflow-hidden rounded-[20px] bg-sand"
    >
      <div data-card-img className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 90vw"
          className="object-cover transition-transform duration-[1.6s] ease-(--ease-silk) group-hover:scale-[1.06]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-[rgba(30,6,7,0)] to-[rgba(30,6,7,0.75)] transition-opacity duration-700 group-hover:opacity-90" />
      <div className="absolute bottom-8 left-8 right-8 flex flex-col items-start gap-2.5 text-ivory">
        <p className="t-label">({count} Sarees)</p>
        <h3 className="font-display text-[clamp(40px,3.61vw,52px)] leading-none tracking-[0.01em]">{name}</h3>
        <span className="t-ui inline-flex items-center gap-2.5">
          <span className="link-u">Explore</span>
          <ArrowIcon tone="ivory" className="transition-transform duration-500 ease-(--ease-silk) group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
