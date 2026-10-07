import { useEffect, useState, useRef } from "react";
import { LAYOUT_MAPS } from "../../lib/keyboard-theme-data";
import type { KeyboardLayout } from "../../lib/keyboard-theme-data";

export interface LastKeyEvent {
  code: string;
  id: string;
}

interface DisplayState {
  label: string;
  id: string;
}

const CODE_TO_LABEL: Record<string, string> = {
  Space: "space", Enter: "enter", Backspace: "⌫", Tab: "tab",
  ShiftLeft: "shift", ShiftRight: "shift", ControlLeft: "ctrl",
  ControlRight: "ctrl", AltLeft: "alt", AltRight: "alt", Escape: "esc",
  ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→",
  CapsLock: "caps",
};

function labelFor(code: string | undefined): string {
  if (!code) return "";
  if (CODE_TO_LABEL[code]) return CODE_TO_LABEL[code];
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  if (code.startsWith("F") && /^F\d+$/.test(code)) return code;
  return code;
}

export interface LastKeyProps {
  lastKey: LastKeyEvent | null;
  accent?: string;
  layout?: KeyboardLayout;
}

export default function LastKey({ lastKey, accent = "#9b72ff", layout = "qwerty" }: LastKeyProps) {
  const [expiredId, setExpiredId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!lastKey) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setExpiredId(lastKey.id), 500);
    return () => clearTimeout(timerRef.current);
  }, [lastKey]);

  const display: DisplayState | null =
    lastKey && expiredId !== lastKey.id
      ? { label: LAYOUT_MAPS[layout]?.[lastKey.code] ?? labelFor(lastKey.code), id: lastKey.id }
      : null;

  return (
    <div className="h-14 flex items-end justify-center mb-1 pointer-events-none">
      {display && (
        <div
          key={display.id}
          className="key-pop font-display font-semibold text-[34px] tracking-tight px-2"
          style={{ color: accent }}
        >
          {display.label}
        </div>
      )}
    </div>
  );
}
