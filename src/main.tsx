import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import FullKeyboardPage from './components/FullKeyboardPage'
import { SiteModeProvider } from './hooks/use-site-mode'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Root element #root not found')
}

createRoot(rootEl).render(
  <StrictMode>
    <SiteModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/keyboard" element={<FullKeyboardPage />} />
        </Routes>
      </BrowserRouter>
    </SiteModeProvider>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "-" || e.key === "0" || e.key === "=")) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

document.addEventListener("wheel", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    e.stopPropagation();
  }
}, { capture: true, passive: false });

const style = document.createElement("style");
style.textContent = `html, body { touch-action: manipulation; overscroll-behavior: none; }`;
document.head.appendChild(style);
