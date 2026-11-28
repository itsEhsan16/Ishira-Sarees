import { collections } from "@/content/home";
import { SectionHeader } from "@/components/ui/primitives";
import CollectionCard from "@/components/ui/CollectionCard";

/** Figma 77:1674 — Section / Collections */
export default function Collections() {
  return (
    <section className="container-x flex flex-col items-start gap-6 pt-section" aria-label="Collections">
      <SectionHeader label="(03) Collections" link={{ label: "Explore All", href: "/collections" }} />
      <ul className="grid w-full gap-4 md:grid-cols-3 md:gap-[17px]" data-stagger>
        {collections.map((c) => (
          <li key={c.slug}>
            <CollectionCard {...c} />
          </li>
        ))}
      </ul>
    </section>
  );
}
