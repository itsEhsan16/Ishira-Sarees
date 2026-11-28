"use client";

import { useState, type FormEvent } from "react";
import { newsletter } from "@/content/home";
import { ArrowIcon, ParallaxImage } from "@/components/ui/primitives";

/** Figma 77:1773 — Section / Newsletter. UI only; Resend wiring lands in Phase 6. */
export default function Newsletter() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
  };

  return (
    <section className="container-x py-section" aria-labelledby="newsletter-title">
      <div data-expand className="overflow-hidden rounded-[24px]">
        <ParallaxImage
          src={newsletter.image}
          alt=""
          sizes="(min-width: 1440px) 1360px, 100vw"
          amount={10}
          className="flex min-h-[460px] items-center justify-center px-6 py-14 md:h-[clamp(400px,31vw,440px)]"
        >
          <div className="absolute inset-0 bg-tint-newsletter opacity-85 mix-blend-color" />
          <div className="relative flex flex-col items-center gap-6 text-center text-bg" data-stagger>
            <p className="t-label text-gold">{newsletter.label}</p>
            <h2 id="newsletter-title" className="font-display text-[clamp(44px,5.28vw,76px)] leading-none tracking-[0.01em]">
              {newsletter.title}
            </h2>
            <p className="t-body-l max-w-[460px]">{newsletter.body}</p>
            {state === "done" ? (
              <p className="t-ui flex h-[43px] w-[min(440px,85vw)] items-center justify-center border-b border-bg" role="status">
                Thank you — you’re on the list.
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="group/f relative w-[min(440px,85vw)]">
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={newsletter.placeholder}
                  aria-invalid={state === "error"}
                  aria-describedby={state === "error" ? "nl-error" : undefined}
                  onInput={() => state === "error" && setState("idle")}
                  className="t-ui w-full border-b border-bg/60 bg-transparent py-3 pr-8 text-bg outline-none placeholder:text-bg"
                />
                {/* animated focus underline */}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-(--ease-silk) group-focus-within/f:scale-x-100" />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 transition-transform duration-500 ease-(--ease-silk) hover:translate-x-1"
                >
                  <ArrowIcon tone="bg" />
                </button>
                {state === "error" && (
                  <p id="nl-error" className="t-ui absolute left-0 top-full mt-2 text-gold">
                    Please enter a valid email address.
                  </p>
                )}
              </form>
            )}
          </div>
        </ParallaxImage>
      </div>
    </section>
  );
}
