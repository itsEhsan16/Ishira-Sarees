import PageMotion from "@/components/motion/PageMotion";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import ZariBorder from "@/components/home/ZariBorder";
import WovenWith from "@/components/home/WovenWith";
import Bestsellers from "@/components/home/Bestsellers";
import Intro from "@/components/home/Intro";
import Collections from "@/components/home/Collections";
import Quote from "@/components/home/Quote";
import TheWeave from "@/components/home/TheWeave";
import HeritageLine from "@/components/home/HeritageLine";
import Banner from "@/components/home/Banner";
import MadeForEmirates from "@/components/home/MadeForEmirates";
import Instagram from "@/components/home/Instagram";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/home/Footer";

/** Figma 77:1611 (layout) · 79:1685 Cocoa & Gold (theme) — Ishira Home */
export default function Home() {
  return (
    <PageMotion>
      <Nav />
      <main>
        <Hero />
        <div className="pt-section">
          <ZariBorder variant="zari" />
        </div>
        <WovenWith />
        <Bestsellers />
        <Intro />
        <Collections />
        <Quote />
        <TheWeave />
        <HeritageLine />
        <Banner />
        <MadeForEmirates />
        <Instagram />
        <Newsletter />
      </main>
      <Footer />
    </PageMotion>
  );
}
