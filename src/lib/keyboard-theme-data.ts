export type KeyboardTheme = "classic" | "mint" | "royal" | "dolch" | "sand" | "scarlet";
export type KeyboardLayout = "qwerty" | "azerty" | "dvorak";
export interface ThemeTokens {
  case: string;
  base: string;
  mod: string;
  accent: string;
  textBase: string;
  textMod: string;
  textAccent: string;
}

export const THEMES: Record<KeyboardTheme, ThemeTokens> = {
  classic: {
    case: "#232226", base: "#e4d7d7", mod: "#9b72ff", accent: "#9b72ff",
    textBase: "#4a4a4b", textMod: "#f0f0f0", textAccent: "#ffffff",
  },
  mint: {
    case: "#1b2622", base: "#eaf3ee", mod: "#2f6f56", accent: "#37b787",
    textBase: "#264034", textMod: "#eafaf3", textAccent: "#ffffff",
  },
  royal: {
    case: "#1a1c30", base: "#e2e4f7", mod: "#3c3f8a", accent: "#5b5fef",
    textBase: "#2a2b52", textMod: "#eceefd", textAccent: "#ffffff",
  },
  dolch: {
    case: "#2b241c", base: "#f1e6cf", mod: "#6b5236", accent: "#c98a3f",
    textBase: "#4a3c26", textMod: "#f6ecd9", textAccent: "#2b2115",
  },
  sand: {
    case: "#26221b", base: "#f3ead4", mod: "#8a6f45", accent: "#c9a227",
    textBase: "#4a3c22", textMod: "#f8f1de", textAccent: "#2b2115",
  },
  scarlet: {
    case: "#241416", base: "#e9e2e2", mod: "#5c1a1a", accent: "#d43b34",
    textBase: "#3a2222", textMod: "#f3e4e4", textAccent: "#ffffff",
  },
};

export const KEYBOARD_THEMES = Object.keys(THEMES) as KeyboardTheme[];

export const LAYOUT_MAPS: Record<KeyboardLayout, Record<string, string>> = {
  qwerty: {},
  azerty: {
    Backquote: "²", Digit1: "&", Digit2: "é", Digit3: "\"", Digit4: "'", Digit5: "(",
    Digit6: "-", Digit7: "è", Digit8: "_", Digit9: "ç", Digit0: "à", Minus: ")", Equal: "=",
    KeyQ: "A", KeyW: "Z", KeyA: "Q", KeyZ: "W", KeyM: ",", Semicolon: "M",
    BracketLeft: "^", BracketRight: "$", Backslash: "*", Quote: "ù",
    KeyE: "E", KeyR: "R", KeyT: "T", KeyY: "Y", KeyU: "U", KeyI: "I", KeyO: "O", KeyP: "P",
    KeyS: "S", KeyD: "D", KeyF: "F", KeyG: "G", KeyH: "H", KeyJ: "J", KeyK: "K", KeyL: "L",
    KeyX: "X", KeyC: "C", KeyV: "V", KeyB: "B", KeyN: "N", Comma: ";", Period: ":", Slash: "!",
  },
  dvorak: {
    KeyQ: "'", KeyW: ",", KeyE: ".", KeyR: "P", KeyT: "Y", KeyY: "F", KeyU: "G",
    KeyI: "C", KeyO: "R", KeyP: "L", KeyA: "A", KeyS: "O", KeyD: "E", KeyF: "U",
    KeyG: "I", KeyH: "D", KeyJ: "H", KeyK: "T", KeyL: "N", KeyZ: ";", KeyX: "Q",
    KeyC: "J", KeyV: "K", KeyB: "X", KeyN: "B", KeyM: "M", Minus: "[", Equal: "]",
    BracketLeft: "/", BracketRight: "=", Backslash: "\\", Semicolon: "S",
    Quote: "-", Comma: "W", Period: "V", Slash: "Z",
  },
};


export const THEME_LABELS: Record<KeyboardTheme, string> = {
  classic: "Classic", mint: "Mint", royal: "Royal",
  dolch: "Dolch", sand: "Sand", scarlet: "Scarlet",
};

export const THEME_ACCENTS: Record<KeyboardTheme, string> = {
  classic: "#9b72ff", mint: "#37b787", royal: "#5b5fef",
  dolch: "#c98a3f", sand: "#c9a227", scarlet: "#d43b34",
};

export const KEYBOARD_LAYOUTS: KeyboardLayout[] = ["qwerty", "azerty", "dvorak"];
