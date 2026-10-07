import { createContext, useContext } from "react";

export type SiteMode = "light" | "dark";

export interface UseSiteModeResult {
  mode: SiteMode;
  toggle: () => void;
}

export const STORAGE_KEY = "keyb-site-mode";

export function readInitialMode(): SiteMode {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const SiteModeContext = createContext<UseSiteModeResult | null>(null);

export function useSiteMode(): UseSiteModeResult {
  const ctx = useContext(SiteModeContext);
  if (!ctx) {
    throw new Error("useSiteMode must be used inside <SiteModeProvider>");
  }
  return ctx;
}
