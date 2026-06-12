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
