import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Moon, Keyboard as KeyboardIcon, Eraser } from "lucide-react";
import Keyboard, {
  type KeyboardTheme,
  type KeyboardLayout,
  type KeyboardInteractionEvent,
} from "./ui/keyboard";
import {
  KEYBOARD_THEMES,
  KEYBOARD_LAYOUTS,
  THEME_LABELS,
  THEME_ACCENTS,
} from "../lib/keyboard-theme-data";
import { charForCode } from "../lib/typing-test";
import LastKey, { type LastKeyEvent } from "./ui/last-key";
import { useSiteMode } from "../lib/site-mode";

export default function FullKeyboardPage() {
  const navigate = useNavigate();
  const { mode, toggle: toggleMode } = useSiteMode();
  const [theme, setTheme] = useState<KeyboardTheme>("classic");
  const [layout, setLayout] = useState<KeyboardLayout>("qwerty");
  const [lastKey, setLastKey] = useState<LastKeyEvent | null>(null);
  const [typingTestOn, setTypingTestOn] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const typingTestRef = useRef(typingTestOn);
  const layoutRef = useRef(layout);
  useEffect(() => {
    typingTestRef.current = typingTestOn;
    layoutRef.current = layout;
  }, [typingTestOn, layout]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleKeyEvent = useCallback((e: KeyboardInteractionEvent) => {
    const el = document.activeElement;
    if (el instanceof HTMLElement) {
      if (el.isContentEditable) return;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    }
    if (e.phase !== "down") return;

    setLastKey({ code: e.code, id: `${e.code}-${performance.now()}` });

    if (!typingTestRef.current) return;
    if (e.code === "Backspace") setTypedText((t) => t.slice(0, -1));
    else if (e.code === "Enter") setTypedText((t) => t + "\n");
    else if (e.code === "Tab") setTypedText((t) => t + "\t");
    else {
      const char = charForCode(e.code, e.shiftKey, layoutRef.current);
      if (char) setTypedText((t) => t + char);
    }
  }, []);

  const pickTheme = (e: MouseEvent<HTMLButtonElement>, id: KeyboardTheme) => {
    setTheme(id);
    e.currentTarget.blur();
  };

  const pickLayout = (e: MouseEvent<HTMLButtonElement>, id: KeyboardLayout) => {
    setLayout(id);
    e.currentTarget.blur();
  };

  const goBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    navigate("/");
  };

  const accent = THEME_ACCENTS[theme];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <nav className={`sticky z-50 ${scrolled ? "top-3" : "top-6"}`}>
        <div className={`mx-auto flex w-fit items-center gap-4 rounded-full border px-3 py-2 backdrop-blur-xl transition-colors ${scrolled ? "border-[var(--border)] bg-[var(--bg)]/80 shadow-lg" : "border-transparent"}`}>
          <button onClick={goBack} aria-label="Back to home" className="rounded-full p-1 text-[var(--text-dim)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]">
            <ArrowLeft size={15} />
          </button>
          <span className="font-display text-[14px] font-semibold tracking-tight">
            keebkit<span style={{ color: accent }}>.</span>
          </span>
          <button onClick={toggleMode} aria-label="Toggle light and dark mode" className="rounded-full p-1 text-[var(--text-mute)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]">
            {mode === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center px-6 py-10 mt-12">
        <LastKey lastKey={lastKey} accent={accent} layout={layout} />

        <div className="w-full overflow-x-auto flex justify-center py-6">
          <Keyboard theme={theme} layout={layout} enableSound enableHaptics onKeyEvent={handleKeyEvent} />
        </div>

        <div className="mt-2 flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center gap-1.5">
            {KEYBOARD_THEMES.map((id) => (
              <button
                key={id}
                onClick={(e) => pickTheme(e, id)}
                className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium ${
                  theme === id ? "text-white shadow-sm" : "bg-[var(--panel-2)] text-[var(--text-dim)] hover:bg-[var(--border)]"
                }`}
                style={theme === id ? { background: THEME_ACCENTS[id] } : undefined}
              >
                {THEME_LABELS[id]}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-1.5">
            {KEYBOARD_LAYOUTS.map((id) => (
              <button
                key={id}
                onClick={(e) => pickLayout(e, id)}
                className={`rounded-full px-3 py-1 font-mono-key text-[11px] ${
                  layout === id ? "bg-[var(--border)] text-[var(--text)]" : "text-[var(--text-mute)] hover:text-[var(--code-text)]"
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={(e) => { setTypingTestOn((v) => !v); e.currentTarget.blur(); }}
          className={`mt-6 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium ${
            typingTestOn ? "text-white shadow-sm" : "bg-[var(--panel-2)] text-[var(--text-dim)] hover:bg-[var(--border)]"
          }`}
          style={typingTestOn ? { background: accent } : undefined}
        >
          <KeyboardIcon size={13} />
          {typingTestOn ? "Hide typing test" : "Try typing test"}
        </button>

        {typingTestOn && (
          <div className="mt-4 w-full max-w-xl">
            <div className="relative min-h-[100px] rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4">
              <button
                onClick={(e) => { setTypedText(""); e.currentTarget.blur(); }}
                aria-label="Clear typed text"
                className="absolute right-2 top-2 rounded-md p-1 text-[var(--text-faint)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]"
              >
                <Eraser size={13} />
              </button>
              <pre className="whitespace-pre-wrap break-words pr-6 font-mono-key text-[13px] text-[var(--text)]">
                {typedText || (
                  <span className="text-[var(--text-faint)]">
                    Type on your physical keyboard, or click the on-screen keys - it&apos;ll show up here.
                  </span>
                )}
                <span className="ml-[1px] inline-block h-[14px] w-[2px] animate-pulse bg-[var(--text-mute)] align-middle" />
              </pre>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-[12px] text-[var(--text-faint)]">
          Type on your physical keyboard, or click the keys with your mouse - both are fully wired up.
        </p>
      </main>
    </div>
  );
}
