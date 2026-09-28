import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SiteMode = "light" | "dark";

export interface UseSiteModeResult {
  mode: SiteMode;
  toggle: () => void;
}

const STORAGE_KEY = "keyb-site-mode";

function readInitialMode(): SiteMode {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const SiteModeContext = createContext<UseSiteModeResult | null>(null);

export function SiteModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SiteMode>(readInitialMode);

  useEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return <SiteModeContext.Provider value={value}>{children}</SiteModeContext.Provider>;
}

export function useSiteMode(): UseSiteModeResult {
  const ctx = useContext(SiteModeContext);
  if (!ctx) {
    throw new Error("useSiteMode must be used inside <SiteModeProvider>");
  }
  return ctx;
}
