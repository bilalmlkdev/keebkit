import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSiteMode } from "../../lib/site-mode";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("bash", bash);

const darkTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': { ...vscDarkPlus['pre[class*="language-"]'], background: "transparent", margin: 0 },
  'code[class*="language-"]': { ...vscDarkPlus['code[class*="language-"]'], background: "transparent" },
};

const lightTheme = {
  ...vs,
  'pre[class*="language-"]': { ...vs['pre[class*="language-"]'], background: "transparent", margin: 0 },
  'code[class*="language-"]': { ...vs['code[class*="language-"]'], background: "transparent" },
};

export interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "jsx" }: CodeBlockProps) {
  const { mode } = useSiteMode();
  const [copied, setCopied] = useState(false);
  const isDark = mode === "dark";
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={`relative group kb-code ${isDark ? "bg-[#1e1e1e]" : "bg-[#f5f5f5]"}`}>
      <button
        onClick={copy}
        aria-label="Copy code"
        className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-md ${isDark ? "text-zinc-500 hover:text-zinc-200 hover:bg-white/5" : "text-zinc-400 hover:text-zinc-700 hover:bg-black/5"}`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={isDark ? darkTheme : lightTheme}
        customStyle={{
          margin: 0,
          padding: "16px",
          paddingRight: "40px",
          fontSize: "13px",
          lineHeight: 1.6,
          background: "transparent",
        }}
        codeTagProps={{ style: { fontFamily: '"JetBrains Mono", ui-monospace, monospace' } }}
        showLineNumbers={code.split("\n").length > 8}
        lineNumberStyle={{ color: isDark ? "#4b4b52" : "#a1a1aa", minWidth: "2em" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

interface PackageManager {
  id: string;
  label: string;
  cmd: (c: string) => string;
}

const MANAGERS: PackageManager[] = [
  { id: "pnpm", label: "pnpm", cmd: (c) => `pnpm dlx ${c}` },
  { id: "yarn", label: "yarn", cmd: (c) => `yarn dlx ${c}` },
  { id: "npm", label: "npm", cmd: (c) => `npx ${c}` },
  { id: "bun", label: "bun", cmd: (c) => `bunx --bun ${c}` },
];

export interface PackageManagerTabsProps {
  registryCommand: string;
}

export function PackageManagerTabs({ registryCommand }: PackageManagerTabsProps) {
  const { mode } = useSiteMode();
  const [active, setActive] = useState<string>("pnpm");
  const isDark = mode === "dark";
  const manager = MANAGERS.find((m) => m.id === active) ?? MANAGERS[0];
  const command = manager.cmd(registryCommand);

  return (
    <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-[#1e1e1e]" : "bg-[#f5f5f5]"} border-[var(--border)]`}>
      <div className={`flex items-center gap-1 px-2 pt-2 border-b ${isDark ? "border-white/5" : "border-black/5"}`}>
        {MANAGERS.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`px-3 py-1.5 text-[12px] font-mono-key rounded-t-md ${
              active === m.id
                ? isDark ? "text-zinc-100 bg-white/5" : "text-zinc-800 bg-black/5"
                : isDark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <CommandLine command={command} />
    </div>
  );
}

function CommandLine({ command }: { command: string }) {
  const { mode } = useSiteMode();
  const [copied, setCopied] = useState(false);
  const isDark = mode === "dark";
  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative">
      <button
        onClick={copy}
        aria-label="Copy command"
        className={`absolute top-2.5 right-2.5 p-1.5 rounded-md ${isDark ? "text-zinc-500 hover:text-zinc-200 hover:bg-white/5" : "text-zinc-400 hover:text-zinc-700 hover:bg-black/5"}`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre className={`kb-no-scrollbar overflow-x-auto p-4 pr-10 text-[13px] font-mono-key`}>
        <code>{command}</code>
      </pre>
    </div>
  );
}
