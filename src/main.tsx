import 'uno.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

function runApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

runApp()
