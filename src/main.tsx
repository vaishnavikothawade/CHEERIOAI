import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App'
import { DemoProvider } from './context/DemoContext'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <DemoProvider><App /></DemoProvider>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)
