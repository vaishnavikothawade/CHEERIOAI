import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FlaskConical, RotateCcw } from 'lucide-react'
import { Switch } from '../ui/Primitives'
import { useDemo } from '../../context/DemoContext'

const jumps: [string, string][] = [
  ['Home', '/home'], ['Campaign report', '/campaigns/diwali-glow-sale'], ['Bot setup', '/chatbots/new'],
  ['Cart recovery edge case', '/automations/cart-recovery'], ['Locked feature edge case', '/contacts/segments'],
]

export default function DemoPanel() {
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { reset, hotspots, setHotspots } = useDemo()
  if (pathname === '/' || pathname === '/login') return null

  return (
    <div className="fixed bottom-5 left-5 z-[90]">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass absolute bottom-12 left-0 w-64 rounded-2xl border border-white/70 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.25)]">
            <button onClick={() => { reset(); setOpen(false); nav('/') }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-semibold hover:bg-black/5"><RotateCcw size={15} /> Restart journey</button>
            <div className="my-2 h-px bg-line" />
            {jumps.map(([l, to]) => (
              <button key={to} onClick={() => { nav(to); setOpen(false) }} className="block w-full rounded-lg px-2.5 py-1.5 text-left text-[13px] text-muted hover:bg-black/5 hover:text-ink">{l}</button>
            ))}
            <div className="my-2 h-px bg-line" />
            <div className="flex items-center justify-between px-2.5 py-1 text-[13px]">Pulsing hotspots <Switch on={hotspots} onChange={setHotspots} /></div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[13px] font-semibold text-white shadow-xl"><FlaskConical size={15} /> Demo</motion.button>
    </div>
  )
}
