import { useState, useCallback, useRef, useEffect, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Moon, Keyboard as KeyboardIcon, Eraser } from "lucide-react";
import Keyboard, { KEYBOARD_THEMES, type KeyboardTheme, type KeyboardLayout, type KeyboardInteractionEvent } from "./ui/keyboard";
import LastKey, { type LastKeyEvent } from "./ui/last-key";
import { useSiteMode } from "../hooks/use-site-mode";

const THEME_LABELS: Record<KeyboardTheme, string> = {
  classic: "Classic", mint: "Mint", royal: "Royal",
  dolch: "Dolch", sand: "Sand", scarlet: "Scarlet",
};
const THEME_ACCENTS: Record<KeyboardTheme, string> = {
  classic: "#9b72ff", mint: "#37b787", royal: "#5b5fef",
  dolch: "#c98a3f", sand: "#c9a227", scarlet: "#d43b34",
};

const LAYOUTS: KeyboardLayout[] = ["qwerty", "azerty", "dvorak"];

const SHIFT_MAP: Record<string, string> = {
  Backquote: "~", Digit1: "!", Digit2: "@", Digit3: "#", Digit4: "$", Digit5: "%",
  Digit6: "^", Digit7: "&", Digit8: "*", Digit9: "(", Digit0: ")",
  Minus: "_", Equal: "+", BracketLeft: "{", BracketRight: "}", Backslash: "|",
  Semicolon: ":", Quote: "\"", Comma: "<", Period: ">", Slash: "?",
};
const BASE_MAP: Record<string, string> = {
  Backquote: "`", Digit1: "1", Digit2: "2", Digit3: "3", Digit4: "4", Digit5: "5",
  Digit6: "6", Digit7: "7", Digit8: "8", Digit9: "9", Digit0: "0",
  Minus: "-", Equal: "=", BracketLeft: "[", BracketRight: "]", Backslash: "\\",
  Semicolon: ";", Quote: "'", Comma: ",", Period: ".", Slash: "/",
};

function charForCode(code: string, shift: boolean): string | null {
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

export default function FullKeyboardPage() {
  const navigate = useNavigate();
  const { mode, toggle } = useSiteMode();
  const [theme, setTheme] = useState<KeyboardTheme>("classic");
  const [layout, setLayout] = useState<KeyboardLayout>("qwerty");
  const [lastKey, setLastKey] = useState<LastKeyEvent | null>(null);
  const [showTypingTest, setShowTypingTest] = useState(false);
  const [typedText, setTypedText] = useState("");
  const showTypingTestRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKeyEvent = useCallback((e: KeyboardInteractionEvent) => {
    const el = document.activeElement;
    if (el instanceof HTMLElement) {
      if (el.isContentEditable) return;
      const tag = el.tagName;
      if (tag === "BUTTON" || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    }

    if (e.phase !== "down") return;

    setLastKey({ code: e.code, id: `${e.code}-${performance.now()}` });

    if (!showTypingTestRef.current) return;

    if (e.code === "Backspace") {
      setTypedText((t) => t.slice(0, -1));
    } else if (e.code === "Enter") {
      setTypedText((t) => t + "\n");
    } else if (e.code === "Tab") {
      setTypedText((t) => t + "\t");
    } else {
      const char = charForCode(e.code, e.shiftKey);
      if (char) setTypedText((t) => t + char);
    }
  }, []);

  const toggleTypingTest = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setShowTypingTest((v) => {
      showTypingTestRef.current = !v;
      return !v;
    });
  };

  const goBack = () => navigate("/");

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <nav className={`sticky top-6 z-50 ${scrolled ? "top-3" : "top-6"}`}>
        <div className="max-w-[1280px] mx-auto flex justify-center">
          <div
            className={`flex items-center gap-5 px-5 py-2.5 rounded-full border backdrop-blur-xl ${
              scrolled
                ? "bg-[var(--bg)]/80 border-[var(--border)] shadow-lg"
                : "bg-transparent border-transparent"
            }`}
          >
            <span className="font-display text-[14px] font-semibold tracking-tight">
              keebkit<span style={{ color: THEME_ACCENTS[theme] }}>.</span>
            </span>
            <div className="h-4 w-px bg-[var(--border)]" />
            <button onClick={toggle} aria-label="Toggle light and dark mode"
              className="p-1 rounded-md text-[var(--text-mute)] hover:text-[var(--text)] hover:bg-[var(--panel-2)]">
              {mode === "light" ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-4xl">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-[13px] text-[var(--text-dim)] hover:text-[var(--text)] mb-6 bg-[var(--panel)] rounded-full px-2 py-1"
          >
            <ArrowLeft size={15} /> Back
          </button>
        </div>

        <LastKey lastKey={lastKey} accent={THEME_ACCENTS[theme]} />

        <div className="w-full overflow-x-auto flex justify-center py-6">
          <Keyboard
            theme={theme}
            layout={layout}
            enableSound
            enableHaptics
            onKeyEvent={handleKeyEvent}
          />
        </div>

        <button
          onClick={toggleTypingTest}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium mt-2 ${
            showTypingTest
              ? "text-white shadow-sm"
              : "text-[var(--text-dim)] bg-[var(--panel-2)] hover:bg-[var(--border)]"
          }`}
          style={showTypingTest ? { background: THEME_ACCENTS[theme] } : undefined}
        >
          <KeyboardIcon size={13} />
          {showTypingTest ? "Hide typing test" : "Try typing test"}
        </button>

        {showTypingTest && (
          <div className="w-full max-w-xl mt-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4 min-h-[100px] relative">
              <button
                onClick={() => setTypedText("")}
                aria-label="Clear typed text"
                title="Clear"
                className="absolute top-2 right-2 p-1 rounded-md text-[var(--text-faint)] hover:text-[var(--text)] hover:bg-[var(--panel-2)]"
              >
                <Eraser size={13} />
              </button>
              <pre className="whitespace-pre-wrap break-words font-mono-key text-[13px] text-[var(--text)] pr-6">
                {typedText || (
                  <span className="text-[var(--text-faint)]">
                    Type on your physical keyboard, or click the on-screen keys - it&apos;ll show up here.
                  </span>
                )}
                <span className="inline-block w-[2px] h-[14px] bg-[var(--text-mute)] align-middle ml-[1px] animate-pulse" />
              </pre>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-1.5 mt-6">
          {KEYBOARD_THEMES.map((id) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium ${
                theme === id
                  ? "text-white shadow-sm"
                  : "text-[var(--text-dim)] bg-[var(--panel-2)] hover:bg-[var(--border)]"
              }`}
              style={theme === id ? { background: THEME_ACCENTS[id] } : undefined}
            >
              {THEME_LABELS[id]}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 mt-2">
          {LAYOUTS.map((id) => (
            <button
              key={id}
              onClick={() => setLayout(id)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono-key ${
                layout === id
                  ? "text-[var(--text)] bg-[var(--border)]"
                  : "text-[var(--text-mute)] hover:text-[var(--code-text)]"
              }`}
            >
              {id}
            </button>
          ))}
        </div>

        <p className="text-center text-[12px] text-[var(--text-faint)] mt-6">
          Type on your physical keyboard, or click the keys with your mouse - both are fully wired up.
        </p>
      </main>
    </div>
  );
}
