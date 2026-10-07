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

const style = document.createElement("style");
style.textContent = `html, body { touch-action: manipulation; overscroll-behavior: none; }`;
document.head.appendChild(style);
