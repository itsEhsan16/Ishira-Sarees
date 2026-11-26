"use client";

import { useEffect, useState } from "react";

/**
 * Temporary palette picker for comparing themes. Shows in development, or on
 * any build once a ?theme=… link has been opened in this browser.
 * Remove (with the boot script in layout.tsx) once the client picks a theme.
 */
const THEMES = [
  { id: "forest", label: "Forest", swatch: "#093624" },
  { id: "wine", label: "Wine", swatch: "#48202f" },
  { id: "teal", label: "Teal", swatch: "#002f35" },
  { id: "aubergine", label: "Aubergine", swatch: "#241329" },
  { id: "indigo", label: "Indigo", swatch: "#22204f" },
  { id: "cocoa", label: "Cocoa", swatch: "#3f2215" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

export default function ThemeSwitcher() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<ThemeId>("forest");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("ishira-theme");
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read client-only state after mount
    setVisible(process.env.NODE_ENV === "development" || stored !== null);
    setActive((document.documentElement.dataset.theme as ThemeId | undefined) ?? "forest");
  }, []);

  const pick = (id: ThemeId) => {
    if (id === "forest") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem("ishira-theme", id);
    } catch {}
    setActive(id);
  };

  if (!visible) return null;

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme preview"
      className="fixed bottom-4 right-4 z-[70] flex items-center gap-1.5 rounded-full border border-ink/10 bg-bg/95 p-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur"
    >
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={active === t.id}
          title={t.label}
          aria-label={t.label}
          onClick={() => pick(t.id)}
          className={`size-7 rounded-full transition-transform duration-300 hover:scale-110 ${
            active === t.id ? "ring-2 ring-gold ring-offset-2 ring-offset-bg" : ""
          }`}
          style={{ backgroundColor: t.swatch }}
        />
      ))}
    </div>
  );
}
