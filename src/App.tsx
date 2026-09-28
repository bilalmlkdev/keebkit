import { useState, useEffect, type ReactNode, type SVGProps } from "react";
import { useNavigate } from "react-router-dom";
import Keyboard, { type KeyboardTheme, type KeyboardLayout } from "./components/ui/keyboard";
import { CodeBlock, PackageManagerTabs } from "./components/ui/code-block";
import { FORMAT_SOURCES } from "./lib/format-sources";
import { useSiteMode } from "./hooks/use-site-mode";
import { Sun, Moon, Maximize2 } from "lucide-react";

const ACCENT = "#9b72ff";

function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="14" height="14" fill="currentColor" {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z" />
      <path d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z" />
    </svg>
  );
}

const API_ROWS = [
  { prop: "theme", type: '"classic" | "mint" | "royal" | "dolch" | "sand" | "scarlet"', def: '"classic"', desc: "Selects one of the six built-in colourways." },
  { prop: "layout", type: '"qwerty" | "azerty" | "dvorak"', def: '"qwerty"', desc: "Remaps letter and symbol keys to the chosen layout." },
  { prop: "enableHaptics", type: "boolean", def: "true", desc: "Turns haptic feedback on supported devices on or off." },
  { prop: "enableSound", type: "boolean", def: "true", desc: "Turns mechanical key sound playback on or off." },
  { prop: "soundUrl", type: "string", def: '"/sounds/click.ogg"', desc: "Path to the keyboard audio file." },
  { prop: "onKeyEvent", type: "(event: KeyboardInteractionEvent) => void", def: "undefined", desc: "Fires on every key down/up from physical or pointer input." },
  { prop: "className", type: "string", def: "undefined", desc: "Adds classes to the root keyboard container." },
];

const EVENT_ROWS = [
  { field: "code", type: "string", desc: "KeyboardEvent code, for example KeyA, Enter, ArrowLeft." },
  { field: "phase", type: '"down" | "up"', desc: "Whether the interaction is key press or key release." },
  { field: "source", type: '"physical" | "pointer"', desc: "Physical keyboard event or key click/touch on UI." },
  { field: "shiftKey", type: "boolean", desc: "True when the key was pressed with Shift held. Use this instead of tracking Shift yourself." },
];

function Column({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[680px] px-6">{children}</div>;
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 text-[15px] font-medium text-[var(--text)]">{children}</h2>;
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-[13px] leading-relaxed text-[var(--text-mute)]">{children}</p>;
}

interface Entry {
  name: string;
  type: string;
  def?: string;
  desc: string;
}

function PropList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="overflow-hidden rounded-lg border border-[var(--border)]">
      {entries.map((e, i) => (
        <li
          key={e.name}
          className={`grid gap-x-6 gap-y-1 px-4 py-3.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] ${
            i > 0 ? "border-t border-[var(--border-soft)]" : ""
          }`}
        >
          <code className="font-mono-key text-[12.5px] leading-5" style={{ color: ACCENT }}>
            {e.name}
          </code>
          <div className="min-w-0">
            <code className="block break-words font-mono-key text-[11.5px] leading-5 text-[var(--text-mute)]">
              {e.type}
            </code>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--text-dim)]">{e.desc}</p>
            {e.def && (
              <p className="mt-1.5 text-[11.5px] text-[var(--text-faint)]">
                Default{" "}
                <code className="font-mono-key text-[var(--text-mute)]">{e.def}</code>
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const navigate = useNavigate();
  const { mode, toggle } = useSiteMode();
  const [previewTheme] = useState<KeyboardTheme>("classic");
  const [previewLayout] = useState<KeyboardLayout>("qwerty");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openKeyboard = () => navigate("/keyboard");

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <nav className={`sticky z-50 ${scrolled ? "top-3" : "top-5"}`}>
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div
            className={`mx-auto flex w-fit items-center gap-1 rounded-full border p-1 pl-4 ${
              scrolled
                ? "border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl"
                : "border-transparent"
            }`}
          >
            <span className="font-display mr-1 text-[14px] font-semibold tracking-tight">
              keebkit<span style={{ color: ACCENT }}>.</span>
            </span>
            <button
              onClick={toggle}
              aria-label="Toggle light and dark mode"
              className="rounded-full p-1.5 text-[var(--text-mute)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]"
            >
              {mode === "light" ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <a
              href="https://github.com/bilalmlkdev/keebkit"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full p-1.5 text-[var(--text-mute)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]"
            >
              <GithubMark />
            </a>
          </div>
        </div>
      </nav>

      <main className="pb-16">
        <Column>
          <div className="pt-12">
            <h1 className="font-display text-[19px] font-semibold tracking-tight">Keyboard</h1>
            <p className="mt-1.5 max-w-[62ch] text-[13px] leading-relaxed text-[var(--text-mute)]">
              A Keychron K2 inspired keyboard component with optional haptics and mechanical
              sound effects.
            </p>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={openKeyboard}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openKeyboard();
              }
            }}
            className="group relative mt-6 h-[380px] cursor-pointer overflow-hidden border border-[var(--border)] bg-[var(--panel)]"
          >
            <div className="absolute -right-[35%] bottom-0 ">
              <Keyboard
                theme={previewTheme}
                layout={previewLayout}
                enableSound={false}
                enableHaptics={false}
                className="scale-110"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openKeyboard();
              }}
              aria-label="Open the full keyboard"
              className="absolute right-2.5 top-2.5  p-1.5 text-[var(--text-faint)] hover:text-[var(--text)] bg-[var(--panel-2)] shadow-xs rounded-lg"
            >
              <Maximize2 size={13} />
            </button>
          </div>

          <div>
            <CodeBlock
              code={`import { Keyboard } from "@/components/ui/keyboard";

export default function Page() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <Keyboard theme="classic" enableHaptics enableSound />
    </div>
  );
}`}
            />
          </div>
        </Column>

        <Column>
          <div className="mt-10">
            <Heading>Installation</Heading>
            <Note>1. Run the following command</Note>
            <PackageManagerTabs registryCommand="shadcn@latest add https://keebkit.vercel.app/r/keyboard.json" />
            <div className="mt-4">
              <Note>
                2. Download <code className="font-mono-key text-[12px] text-[var(--code-text)]">click.ogg</code>{" "}
                and place it in your{" "}
                <code className="font-mono-key text-[12px] text-[var(--code-text)]">public/sounds/</code> folder,
                or just run the commands below:
              </Note>
              <CodeBlock
                language="bash"
                code={`mkdir -p public/sounds\ncurl -L https://keebkit.vercel.app/sounds/click.ogg -o public/sounds/click.ogg`}
              />
            </div>
          </div>
        </Column>

        <Column>
          <div className="mt-10">
            <Heading>Event callback usage</Heading>
            <CodeBlock
              code={`import { Keyboard, type KeyboardInteractionEvent } from "@/components/ui/keyboard";

export default function Page() {
  return (
    <Keyboard
      theme="mint"
      enableHaptics
      enableSound
      onKeyEvent={(event: KeyboardInteractionEvent) => {
        console.log(event.code, event.phase, event.source);
      }}
    />
  );
}`}
            />
          </div>
        </Column>

        <Column>
          <div className="mt-10">
            <Heading>API reference</Heading>
            <PropList
              entries={API_ROWS.map((r) => ({
                name: r.prop,
                type: r.type,
                def: r.def,
                desc: r.desc,
              }))}
            />
          </div>
        </Column>

        <Column>
          <div className="mt-10">
            <Heading>KeyboardInteractionEvent</Heading>
            <PropList
              entries={EVENT_ROWS.map((r) => ({
                name: r.field,
                type: r.type,
                desc: r.desc,
              }))}
            />
          </div>
        </Column>

        <Column>
          <div className="mt-10">
            <Heading>Source</Heading>
            <FormatSwitcher />
          </div>
        </Column>
      </main>

      <footer className="border-t border-[var(--border-soft)] py-6">
        <Column>
          <p className="text-[12px] text-[var(--text-faint)]">
            made by{" "}
            <a
              href="https://github.com/bilalmlkdev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-mute)]"
              style={{ color: ACCENT }}
            >
              @bilalmlkdev
            </a>
          </p>
        </Column>
      </footer>
    </div>
  );
}

const FORMATS = [
  { id: "jsx", label: "JSX" },
  { id: "tsx", label: "TSX" },
  { id: "html", label: "HTML" },
  { id: "js", label: "JS" },
] as const;

function FormatSwitcher() {
  const [format, setFormat] = useState<(typeof FORMATS)[number]["id"]>("tsx");

  return (
    <div>
      <div className="mb-2 flex gap-1">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFormat(f.id)}
            className={`rounded px-2 py-1 font-mono-key text-[11.5px] ${
              format === f.id
                ? "bg-[var(--panel-2)] text-[var(--text)]"
                : "text-[var(--text-faint)] hover:text-[var(--text-mute)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={FORMAT_SOURCES[format]}
        language={format === "js" ? "javascript" : format}
      />
    </div>
  );
}
