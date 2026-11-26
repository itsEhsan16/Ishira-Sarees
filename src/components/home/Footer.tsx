import Link from "next/link";
import { footer } from "@/content/home";
import { LogoLockup } from "@/components/ui/primitives";
import ZariBorder from "./ZariBorder";

/** Figma 77:1784 — Section / Footer */
export default function Footer() {
  return (
    <footer className="bg-footer pt-section text-bg" data-footer>
      <div className="container-x flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-4" data-reveal>
          <p className="t-label text-gold">{footer.label}</p>
          <p className="t-heading-italic max-w-[420px]">{footer.line}</p>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 lg:flex lg:gap-[72px]" aria-label="Footer" data-stagger>
          {footer.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="t-label text-gold">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="t-ui link-u whitespace-nowrap">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <ZariBorder variant="zari-footer" className="mt-section-sm" />

      <div className="flex justify-center overflow-hidden pb-[38px] pt-[38px]" data-footer-logo>
        <LogoLockup />
      </div>

      <div className="container-x pb-8">
        <div className="t-ui flex flex-col gap-3 border-t border-bg pt-6 md:flex-row md:justify-between">
          {footer.bottom.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}
