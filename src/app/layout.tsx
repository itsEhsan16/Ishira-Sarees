import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Italiana, Jost } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

// Variable fonts: any weight in between is available (e.g. Jost 350 for body).
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: "variable",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ishira — Kanjivaram Silk Sarees, Woven in Kanchipuram",
  description:
    "Pure mulberry silk and real zari, hand-woven on wooden looms in Kanchipuram by master weavers — now arriving in the UAE. Prices in AED.",
};

export const viewport: Viewport = {
  themeColor: "#fffdf8",
};

/* Adds .js-motion before first paint so CSS can hide elements GSAP will reveal.
   Also clears the old theme-preview choice saved by the removed switcher. */
const bootScript = `document.documentElement.classList.add('js-motion');try{localStorage.removeItem('ishira-theme')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable} ${italiana.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
