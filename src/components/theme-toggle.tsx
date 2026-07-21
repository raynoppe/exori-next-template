"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { NavTheme } from "@/components/blocks/navigation/types";

type ThemeToggleProps = {
  defaultTheme?: NavTheme;
};

export function ThemeToggle({ defaultTheme }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("nimbus-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let isDark: boolean;
    if (stored === "dark") {
      isDark = true;
    } else if (stored === "light") {
      isDark = false;
    } else if (defaultTheme) {
      isDark = defaultTheme === "dark";
    } else {
      isDark = prefersDark;
    }

    setDark(isDark);
    root.classList.toggle("dark", isDark);
  }, [defaultTheme]);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("nimbus-theme", next ? "dark" : "light");
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
