import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { SiteModeContext, STORAGE_KEY, readInitialMode, type SiteMode } from "../lib/site-mode";

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
