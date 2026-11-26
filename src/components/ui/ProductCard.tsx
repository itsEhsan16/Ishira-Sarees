import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/home";
import { formatAED } from "@/lib/format";
import { HeartIcon } from "@/components/ui/primitives";

const SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw";

/**
 * Figma component ProductCard (instance 77:1660) — 328 × 470, image 328 × 404.
 * Shows the folded saree; on hover it cross-fades to the draped photo.
 */
export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const href = `/products/${product.slug}`;
  return (
    <article className="group flex flex-col gap-4">
      <div className="relative aspect-[328/404] overflow-hidden rounded-2xl bg-sand">
        <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0">
          <div data-card-img className="absolute inset-0">
            <Image
              src={product.image}
              alt=""
              fill
              priority={priority}
              sizes={SIZES}
              style={product.imagePosition ? { objectPosition: product.imagePosition } : undefined}
              className="object-cover transition-transform duration-[1.4s] ease-(--ease-silk) group-hover:scale-[1.06]"
            />
            {product.hoverImage && (
              <Image
                src={product.hoverImage}
                alt=""
                fill
                sizes={SIZES}
                className="object-cover object-[50%_35%] opacity-0 transition-opacity duration-700 ease-(--ease-silk) group-hover:opacity-100"
              />
            )}
          </div>
        </Link>
        <span className="t-label pointer-events-none absolute left-4 top-4 rounded-full bg-ivory px-2.5 py-1.5 text-oxblood">
          {product.tag}
        </span>
        {/* ivory chip keeps the heart visible on dark photos */}
        <button
          type="button"
          aria-label={`Save ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-ivory/90 transition-transform duration-500 ease-(--ease-silk) hover:scale-110"
        >
          <HeartIcon />
        </button>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="t-title-card text-card-ink">
            <Link href={href} className="link-u">
              {product.name}
            </Link>
          </h3>
          <p className="t-ui text-card-muted">{product.detail}</p>
        </div>
        <p className="t-ui whitespace-nowrap text-card-ink">{formatAED(product.priceAed)}</p>
      </div>
    </article>
  );
}
