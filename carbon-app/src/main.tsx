import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.scss' // IBM Plex Sans (Carbon's typeface) — only the weights we use
import './index.scss' // Carbon styles + tokens
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Offline support (production only — keeps the dev HMR pipeline untouched).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* offline support is best-effort */
    })
  })
}
