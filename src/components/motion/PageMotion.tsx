"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * All homepage motion lives here and is driven by data-attributes on the
 * (server-rendered) sections, so section markup stays declarative:
 *
 *  data-reveal        fade + rise on enter
 *  data-stagger       children fade + rise, staggered
 *  data-split="lines" masked line-by-line reveal (SplitText)
 *  data-word-fill     words brighten as you scroll (SplitText, scrubbed)
 *  data-parallax=N    inner image drifts ±N% (scrubbed)
 *  data-clip          image wipes up from the bottom on enter
 *  data-expand        framed image opens from inset to full width (scrubbed)
 *  data-rule          gold/ink rule draws from the left
 *  data-draw          ornament draws out from its centre
 *  data-spin-in       motif rotates/scales in on enter
 *  data-spin          motif rotates continuously with scroll
 *  data-marquee=±1    woven border tiles drift; speed follows scroll velocity
 *  data-float=±1      tiles drift at opposing speeds (Instagram grid)
 *  data-card-img      card image settles from a slight zoom on enter
 *  data-hero-*        page-load timeline (nav, logo, hero frame)
 */
export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
          if (!motion) return;
          const dist = desktop ? 48 : 28;

          /* ---------- Page load ---------- */
          const heroTitle = q("[data-hero-title]")[0];
          const heroSplit = heroTitle ? SplitText.create(heroTitle, { type: "lines", mask: "lines" }) : null;

          gsap.set(q("[data-hero-nav], [data-hero-frame]"), { visibility: "visible" });
          const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1.4 } });
          // Hold the intro until the logo emblem has decoded (max 1.2s) so it never animates in empty.
          const emblem = q("[data-hero-nav] [data-logo-emblem] img")[0] as HTMLImageElement | undefined;
          Promise.race([
            emblem?.decode?.().catch(() => undefined) ?? Promise.resolve(),
            new Promise((r) => setTimeout(r, 1200)),
          ]).then(() => intro.play());
          intro
            .from(q("[data-hero-nav] [data-logo-emblem]"), { autoAlpha: 0, scale: 0.9, y: 24, duration: 1.8 }, 0)
            .from(
              q("[data-hero-nav] [data-logo-word]"),
              { clipPath: "inset(0% 0% 100% 0%)", letterSpacing: "0.6em", yPercent: 30, duration: 1.8 },
              0.15,
            )
            .from(q("[data-hero-links]"), { autoAlpha: 0, y: -14, stagger: 0.08, duration: 1 }, 0.35)
            .from(q('[data-hero-tag="left"]'), { autoAlpha: 0, x: -40 }, 0.5)
            .from(q('[data-hero-tag="right"]'), { autoAlpha: 0, x: 40 }, 0.5)
            .from(
              q("[data-hero-frame]"),
              { clipPath: "inset(10% 7% 0% 7% round 24px)", duration: 1.9, ease: "expo.inOut" },
              0.35,
            )
            .from(q("[data-hero-frame] [data-parallax]"), { scale: 1.25, duration: 2.4, ease: "expo.out" }, 0.35);
          if (heroSplit) intro.from(heroSplit.lines, { yPercent: 110, stagger: 0.1, duration: 1.4 }, 1.05);
          intro.from(
            q("[data-hero-copy] > :not([data-hero-title])"),
            { autoAlpha: 0, y: 24, stagger: 0.08, duration: 1.2 },
            1.15,
          );

          // Hero copy drifts up slightly faster than the image on scroll
          gsap.to(q("[data-hero-copy]"), {
            yPercent: -18,
            ease: "none",
            scrollTrigger: { trigger: q("[data-hero-frame]")[0], start: "top top", end: "bottom top", scrub: true },
          });

          /* ---------- Generic reveals ---------- */
          q("[data-reveal]").forEach((el) => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: dist * 0.6 },
              { autoAlpha: 1, y: 0, duration: 1.3, scrollTrigger: { trigger: el, start: "top 90%", once: true } },
            );
          });

          q("[data-stagger]").forEach((group) => {
            gsap.fromTo(
              group.children,
              { autoAlpha: 0, y: dist },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1.3,
                stagger: 0.09,
                scrollTrigger: { trigger: group, start: "top 86%", once: true },
              },
            );
          });

          q("[data-split='lines']").forEach((el) => {
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit(self) {
                gsap.set(el, { visibility: "visible" });
                return gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 1.4,
                  stagger: 0.1,
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                });
              },
            });
          });

          q("[data-word-fill]").forEach((el) => {
            SplitText.create(el, {
              type: "words",
              autoSplit: true,
              onSplit(self) {
                return gsap.fromTo(
                  self.words,
                  { opacity: 0.14 },
                  {
                    opacity: 1,
                    ease: "none",
                    stagger: 0.05,
                    scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.6 },
                  },
                );
              },
            });
          });

          /* ---------- Images ---------- */
          q("[data-parallax]").forEach((inner) => {
            const amount = Number(inner.dataset.parallax) || 8;
            const travel = (amount / (100 + amount * 2)) * 100; // ±amount% of the frame, in % of the inner layer
            const frame = inner.parentElement!;
            gsap.fromTo(
              inner,
              { yPercent: -travel },
              {
                yPercent: travel,
                ease: "none",
                scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });

          q("[data-clip]").forEach((el) => {
            gsap.from(el, {
              clipPath: "inset(100% 0% 0% 0% round 16px)",
              duration: 1.6,
              ease: "expo.inOut",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
          });

          q("[data-expand]").forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: `inset(0% ${desktop ? 6 : 3}% 0% ${desktop ? 6 : 3}% round 24px)` },
              {
                clipPath: "inset(0% 0% 0% 0% round 24px)",
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: true },
              },
            );
          });

          q("[data-card-img]").forEach((el) => {
            gsap.from(el, {
              scale: 1.14,
              duration: 1.8,
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            });
          });

          q("[data-card-rise]").forEach((el) => {
            gsap.from(el, {
              y: dist * 2,
              autoAlpha: 0,
              duration: 1.5,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
          });

          /* ---------- Ornaments ---------- */
          q("[data-rule]").forEach((el) => {
            gsap.from(el, {
              scaleX: 0,
              duration: 1.6,
              ease: "expo.inOut",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            });
          });

          q("[data-draw]").forEach((el) => {
            gsap.from(el, {
              clipPath: "inset(0% 50% 0% 50%)",
              duration: 1.8,
              ease: "expo.inOut",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          });

          q("[data-spin-in]").forEach((el) => {
            gsap.from(el, {
              rotate: -120,
              scale: 0.5,
              autoAlpha: 0,
              duration: 1.8,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
          });

          q("[data-spin]").forEach((el) => {
            gsap.fromTo(
              el,
              { rotate: -40 },
              {
                rotate: 40,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });

          q("[data-diamond]").forEach((el) => {
            gsap.to(el, {
              rotate: 180,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            });
          });

          q("[data-float]").forEach((el) => {
            const dir = Number(el.dataset.float) || 1;
            gsap.fromTo(
              el,
              { y: dir * (desktop ? 50 : 24) },
              {
                y: -dir * (desktop ? 50 : 24),
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });

          /* ---------- Woven borders drift with scroll velocity ---------- */
          const strips = q("[data-marquee]").map((el) => ({
            el,
            dir: Number(el.dataset.marquee) || 1,
            x: 0,
          }));
          let boost = 0;
          const velocity = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              boost = gsap.utils.clamp(-14, 14, self.getVelocity() / 260);
            },
          });
          const drift = () => {
            boost *= 0.94;
            strips.forEach((s) => {
              s.x += s.dir * (0.35 + Math.abs(boost));
              s.el.style.backgroundPositionX = `${s.x}px`;
            });
          };
          gsap.ticker.add(drift);

          /* ---------- The Weave: plum panel opens out as it arrives ---------- */
          const weave = q("[data-weave]")[0];
          if (weave) {
            gsap.fromTo(
              weave,
              { clipPath: `inset(0% ${desktop ? 2.8 : 0}% 0% ${desktop ? 2.8 : 0}% round ${desktop ? 40 : 24}px)` },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                ease: "none",
                scrollTrigger: { trigger: weave, start: "top bottom", end: "top 15%", scrub: true },
              },
            );
          }

          /* ---------- Footer: logo rises out of the zari border ---------- */
          const footerLogo = q("[data-footer-logo] > *")[0];
          if (footerLogo) {
            gsap.from(footerLogo, {
              yPercent: 45,
              autoAlpha: 0.2,
              ease: "none",
              scrollTrigger: { trigger: q("[data-footer]")[0], start: "top 70%", end: "bottom bottom", scrub: true },
            });
          }

          // Late layout shifts (fonts, images) — keep trigger positions honest
          document.fonts?.ready.then(() => ScrollTrigger.refresh());

          return () => {
            gsap.ticker.remove(drift);
            velocity.kill();
            heroSplit?.revert();
          };
        },
      );
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
