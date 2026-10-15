import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import DemoPanel from './components/demo/DemoPanel'
import { Toaster } from './components/ui/Toast'
import Intro from './pages/Intro'
import Login from './pages/Login'
import Home from './pages/Home'
import CampaignReport from './pages/CampaignReport'
import BotSetup from './pages/BotSetup'
import BotLive from './pages/BotLive'
import CartRecovery from './pages/CartRecovery'
import SegmentsLocked from './pages/SegmentsLocked'
import Placeholder from './pages/Placeholder'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AppShell />}>
          <Route path="/home" element={<Home />} />
          <Route path="/campaigns/diwali-glow-sale" element={<CampaignReport />} />
          <Route path="/chatbots/new" element={<BotSetup />} />
          <Route path="/chatbots/glow-assistant" element={<BotLive />} />
          <Route path="/automations/cart-recovery" element={<CartRecovery />} />
          <Route path="/contacts/segments" element={<SegmentsLocked />} />
          <Route path="*" element={<Placeholder />} />
        </Route>
      </Routes>
      <DemoPanel />
      <Toaster />
    </>
  )
}
