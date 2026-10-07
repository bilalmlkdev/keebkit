import { LAYOUT_MAPS } from "./keyboard-theme-data";
import type { KeyboardLayout } from "./keyboard-theme-data";

const SHIFT_MAP: Record<string, string> = {
  Backquote: "~", Digit1: "!", Digit2: "@", Digit3: "#", Digit4: "$", Digit5: "%",
  Digit6: "^", Digit7: "&", Digit8: "*", Digit9: "(", Digit0: ")",
  Minus: "_", Equal: "+", BracketLeft: "{", BracketRight: "}", Backslash: "|",
  Semicolon: ":", Quote: '"', Comma: "<", Period: ">", Slash: "?",
};

const BASE_MAP: Record<string, string> = {
  Backquote: "`", Digit1: "1", Digit2: "2", Digit3: "3", Digit4: "4", Digit5: "5",
  Digit6: "6", Digit7: "7", Digit8: "8", Digit9: "9", Digit0: "0",
  Minus: "-", Equal: "=", BracketLeft: "[", BracketRight: "]", Backslash: "\\",
  Semicolon: ";", Quote: "'", Comma: ",", Period: ".", Slash: "/",
};

export function charForCode(code: string, shift: boolean, layout: KeyboardLayout): string | null {
  if (layout !== "qwerty") {
    const mapped = LAYOUT_MAPS[layout]?.[code];
    if (mapped && mapped.length === 1) {
      return /[A-Z]/.test(mapped) ? (shift ? mapped : mapped.toLowerCase()) : mapped;
    }
  }
  if (code.startsWith("Key")) {
    const letter = code.slice(3);
    return shift ? letter : letter.toLowerCase();
  }
  if (code === "Space") return " ";
  if (code in SHIFT_MAP || code in BASE_MAP) {
    return shift ? SHIFT_MAP[code] : BASE_MAP[code];
  }
  return null;
}
