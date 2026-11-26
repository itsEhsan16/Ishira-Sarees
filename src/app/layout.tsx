import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Italiana, Jost } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ThemeSwitcher from "@/components/ThemeSwitcher";
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

/* Runs before first paint:
   - adds .js-motion so CSS can hide elements GSAP will reveal
   - theme preview: ?theme=wine (forest | wine | teal | aubergine | indigo | cocoa)
     sets html[data-theme] and remembers the choice in this browser.
     Remove, with ThemeSwitcher, once the client has picked a palette. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js-motion');
try{var ok={forest:1,wine:1,teal:1,aubergine:1,indigo:1,cocoa:1};
var q=new URLSearchParams(location.search).get('theme');
if(q&&ok[q]){localStorage.setItem('ishira-theme',q)}
var t=localStorage.getItem('ishira-theme');if(t&&ok[t]&&t!=='forest'){d.setAttribute('data-theme',t)}}catch(e){}})()`;

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
        <ThemeSwitcher />
      </body>
    </html>
  );
}
