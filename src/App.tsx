import { useState, useEffect, type ReactNode, type SVGProps } from "react";
import { useNavigate } from "react-router-dom";
import Keyboard, { KEYBOARD_THEMES, type KeyboardTheme, type KeyboardLayout } from "./components/ui/keyboard";
import { CodeBlock, PackageManagerTabs } from "./components/ui/code-block";
import { FORMAT_SOURCES } from "./lib/format-sources";
import { useSiteMode } from "./hooks/use-site-mode";
import { Sun, Moon, Download, Terminal, FileCode, Maximize2 } from "lucide-react";

function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="13"
      height="13"
      fill="currentColor"
      {...props}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z"
          fill="currentColor"
        ></path>{" "}
        <path
          d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z"
          fill="currentColor"
        ></path>{" "}
      </g>
    </svg>
  );
}

const THEME_ACCENTS: Record<KeyboardTheme, string> = {
  classic: "#9b72ff", mint: "#37b787", royal: "#5b5fef",
  dolch: "#c98a3f", sand: "#c9a227", scarlet: "#d43b34",
};

const USAGE_CODE = `import Keyboard from "@/components/ui/keyboard";

export default function Page() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <Keyboard theme="classic" enableHaptics enableSound />
    </div>
  );
}`;

const EVENT_CODE = `import Keyboard from "@/components/ui/keyboard";

export default function Page() {
  return (
    <Keyboard
      theme="mint"
      enableHaptics
      enableSound
      onKeyEvent={(event) => {
        console.log(event.code, event.phase, event.source);
      }}
    />
  );
}`;

interface ApiRow {
  prop: string;
  type: string;
  def: string;
  desc: string;
}

const API_ROWS: ApiRow[] = [
  { prop: "theme", type: '"classic" | "mint" | "royal" | "dolch" | "sand" | "scarlet"', def: '"classic"', desc: "Selects one of the six built-in colorways." },
  { prop: "layout", type: '"qwerty" | "azerty" | "dvorak"', def: '"qwerty"', desc: "Remaps letter and symbol keys to the chosen layout." },
  { prop: "enableHaptics", type: "boolean", def: "true", desc: "Vibrates on supported devices when a key is pressed." },
  { prop: "enableSound", type: "boolean", def: "true", desc: "Plays a mechanical click on every keydown." },
  { prop: "soundUrl", type: "string", def: '"/sounds/click.ogg"', desc: "Path to the audio file used for the click sound." },
  { prop: "onKeyEvent", type: "(event: KeyboardInteractionEvent) => void", def: "undefined", desc: "Fires on every physical key down or up." },
  { prop: "className", type: "string", def: "undefined", desc: "Extra classes applied to the keyboard frame." },
];

const LAYOUT_CYCLE: KeyboardLayout[] = ["qwerty", "azerty", "dvorak"];

export default function App() {
  const navigate = useNavigate();
  const { mode, toggle } = useSiteMode();
  const [theme] = useState<KeyboardTheme>("classic");
  const [previewTheme, setPreviewTheme] = useState<KeyboardTheme>("classic");
  const [previewLayout, setPreviewLayout] = useState<KeyboardLayout>("qwerty");

  const openFullKeyboard = () => {
    navigate("/keyboard");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewTheme((prev) => {
        const idx = KEYBOARD_THEMES.indexOf(prev);
        return KEYBOARD_THEMES[(idx + 1) % KEYBOARD_THEMES.length];
      });
      setPreviewLayout((prev) => {
        const idx = LAYOUT_CYCLE.indexOf(prev);
        return LAYOUT_CYCLE[(idx + 1) % LAYOUT_CYCLE.length];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="sticky top-0 z-20 backdrop-blur bg-[var(--bg)]/80 border-b border-[var(--border-soft)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 h-14">
          <span className="font-display font-semibold tracking-tight text-[15px]">
            keebkit<span style={{ color: THEME_ACCENTS[theme] }}>.</span>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle light and dark mode"
              className="p-1.5 rounded-md text-[var(--text-mute)] hover:text-[var(--text)] hover:bg-[var(--panel-2)] transition-colors"
            >
              {mode === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <a
              href="https://github.com/bilalmlkdev/keebkit.git"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-0.5 text-[14px] text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
            >
              <GithubMark /> <span className="relative top-[1px]">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-32">
        <section className="pt-20 pb-10 text-center">
          <h1 className="font-display text-[40px] sm:text-[48px] font-semibold tracking-tight leading-[1.05]">
            A keyboard, rebuilt for the web.
          </h1>
          <p className="mt-4 text-[16px] text-[var(--text-dim)] max-w-lg mx-auto">
            A keyboard component with haptics, mechanical sound, and six
            colorways. Drop it into any React project.
          </p>
        </section>

        <section className="mb-24">
          <div
            onClick={openFullKeyboard}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openFullKeyboard();
            }}
            aria-label="Open full keyboard in a new page"
            className="group relative rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8 sm:p-12 cursor-pointer transition-colors hover:border-[var(--text-faint)]"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                openFullKeyboard();
              }}
              aria-label="Open full keyboard in a new page"
              title="Maximize"
              className="absolute top-4 right-4 z-10 p-1.5 rounded-md text-[var(--text-mute)] hover:text-[var(--text)] hover:bg-[var(--panel-2)] transition-colors"
            >
              <Maximize2 size={15} />
            </button>
            <div className="relative flex justify-center overflow-hidden max-h-[150px] sm:max-h-[170px]">
              <Keyboard
                theme={previewTheme}
                layout={previewLayout}
                enableSound={false}
                enableHaptics={false}
                className="transition-colors duration-700"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--panel))",
                }}
              />
            </div>
          </div>
        </section>

        <Section title="Installation" number="01">
          <InstallTabs theme={theme} />
        </Section>

        <Section title="Usage" number="02">
          <CodeBlock code={USAGE_CODE} />
        </Section>

        <Section title="Event callback usage" number="03">
          <p className="text-[var(--text-dim)] text-[14px] mb-3">
            Listen to every key down and up, whether it came from the physical
            keyboard or an on-screen click.
          </p>
          <CodeBlock code={EVENT_CODE} />
        </Section>

        <Section title="API reference" number="04">
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[var(--panel-2)] text-[var(--text-mute)] text-left">
                  <th className="font-medium px-4 py-2.5">Prop</th>
                  <th className="font-medium px-4 py-2.5">Type</th>
                  <th className="font-medium px-4 py-2.5">Default</th>
                  <th className="font-medium px-4 py-2.5">Description</th>
                </tr>
              </thead>
              <tbody>
                {API_ROWS.map((row, i) => (
                  <tr
                    key={row.prop}
                    className={
                      i !== 0 ? "border-t border-[var(--border-soft)]" : ""
                    }
                  >
                    <td className="px-4 py-3 font-mono-key text-[#9B26FF] align-top whitespace-nowrap">
                      {row.prop}
                    </td>
                    <td className="px-4 py-3 font-mono-key text-[var(--text-mute)] align-top">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 font-mono-key text-[var(--text-mute)] align-top whitespace-nowrap">
                      {row.def}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-dim)] align-top">
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </main>

      <footer className="border-t border-[var(--border-soft)] py-8 text-center text-[12px] text-[var(--text-faint)]">
        keebkit - made by <a href="https://github.com/bilalmlkdev" target="_blank" className="text-[#9B26FF]">@bilalmlkdev</a>
      </footer>
    </div>
  );
}

interface SectionProps {
  title: string;
  number: string;
  children: ReactNode;
}

function Section({ title, number, children }: SectionProps) {
  return (
    <section className="mb-16">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono-key text-[11px] text-[var(--text-faint)]">{number}</span>
        <h2 className="font-display text-[20px] font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

type FormatId = "jsx" | "tsx" | "html" | "js";

const FORMAT_TABS: { id: FormatId; label: string }[] = [
  { id: "jsx", label: "JSX" },
  { id: "tsx", label: "TSX" },
  { id: "html", label: "HTML" },
  { id: "js", label: "JS" },
];

function InstallTabs({ theme }: { theme: KeyboardTheme }) {
  const [mode, setMode] = useState<"cli" | "manual">("cli");
  const [format, setFormat] = useState<FormatId>("jsx");

  return (
    <div>
      <div className="flex gap-1.5 mb-4">
        <button
          onClick={() => setMode("cli")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors ${
            mode === "cli"
              ? "text-white"
              : "text-[var(--text-dim)] bg-[var(--panel-2)] hover:text-[var(--text)]"
          }`}
          style={mode === "cli" ? { background: THEME_ACCENTS[theme] } : undefined}
        >
          <Terminal size={13} /> CLI
        </button>
        <button
          onClick={() => setMode("manual")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors ${
            mode === "manual"
              ? "text-white"
              : "text-[var(--text-dim)] bg-[var(--panel-2)] hover:text-[var(--text)]"
          }`}
          style={mode === "manual" ? { background: THEME_ACCENTS[theme] } : undefined}
        >
          <FileCode size={13} /> Manual
        </button>
      </div>

      {mode === "cli" ? (
        <PackageManagerTabs registryCommand="shadcn@latest add https://keebkit.vercel.app/r/keyboard.json" />
      ) : (
        <div>
          <p className="text-[var(--text-dim)] text-[14px] mb-3">
            No CLI? Copy the component straight into your project in whichever format fits your stack:
          </p>
          <div className="flex gap-1 mb-3">
            {FORMAT_TABS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-mono-key transition-colors ${
                  format === f.id
                    ? "text-[var(--text)] bg-[var(--panel-2)]"
                    : "text-[var(--text-faint)] hover:text-[var(--text-dim)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <CodeBlock code={FORMAT_SOURCES[format]} language={format === "js" ? "javascript" : format} />
          {format === "html" && (
            <p className="text-[var(--text-faint)] text-[12px] mt-2">
              Save as <code className="font-mono-key text-[var(--code-text)]">index.html</code> and open it directly - style and behavior are self-contained.
            </p>
          )}
          {format === "js" && (
            <p className="text-[var(--text-faint)] text-[12px] mt-2">
              Save as <code className="font-mono-key text-[var(--code-text)]">keyboard.js</code>, then <code className="font-mono-key text-[var(--code-text)]">import {"{"} mountKeyboard {"}"}</code> and call it with a container element.
            </p>
          )}
        </div>
      )}

      <SoundStep theme={theme} />
    </div>
  );
}

function SoundStep({ theme }: { theme: KeyboardTheme }) {
  return (
    <>
      <p className="text-[var(--text-dim)] text-[14px] mt-8 mb-3">
        Then grab the click sound and drop it in your <code className="font-mono-key text-[var(--code-text)]">public/sounds/</code> folder:
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/sounds/click.ogg"
          download
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: THEME_ACCENTS[theme] }}
        >
          <Download size={14} /> Download click.ogg
        </a>
        <span className="text-[12px] text-[var(--text-faint)]">or run:</span>
      </div>
      <div className="mt-3">
        <CodeBlock
          code={`mkdir -p public/sounds\ncurl -L https://keebkit.vercel.app/sounds/click.ogg -o public/sounds/click.ogg`}
          language="bash"
        />
      </div>
      <p className="text-[var(--text-faint)] text-[12px] mt-3">
        Using a different sound? Point the <code className="font-mono-key text-[var(--code-text)]">soundUrl</code> prop (or <code className="font-mono-key text-[var(--code-text)]">soundUrl</code> option in the JS version) at your own file instead.
      </p>
    </>
  );
}
