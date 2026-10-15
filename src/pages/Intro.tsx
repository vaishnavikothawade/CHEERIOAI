import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MousePointerClick, Sparkles } from 'lucide-react'
import { Logo } from '../components/layout/Sidebar'
import { Button } from '../components/ui/Button'
import { Hotspot } from '../components/ui/Primitives'
import { ease } from '../components/ui/motion'

const SECONDS = 5

export default function Intro() {
  const nav = useNavigate()
  const [left, setLeft] = useState(SECONDS)
  useEffect(() => {
    if (left <= 0) return
    const t = setTimeout(() => setLeft((x) => x - 1), 1000)
    return () => clearTimeout(t)
  }, [left])
  const ready = left <= 0

  return (
    <div className="relative flex min-h-full items-center justify-center overflow-hidden bg-sidebar p-6 text-white">
      <div className="absolute -left-20 -top-20 h-[520px] w-[520px] rounded-full bg-accent/50 blur-[110px] animate-blob" />
      <div className="absolute -bottom-32 right-0 h-[520px] w-[520px] rounded-full bg-primary/50 blur-[110px] animate-blob [animation-delay:-6s]" />
      <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease }}
        className="relative w-full max-w-[520px] rounded-modal border border-white/15 bg-white/10 p-9 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="flex justify-center"><Logo /></div>
        <span className="mx-auto mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/90"><Sparkles size={13} /> Growth Copilot</span>
        <h1 className="mt-4 text-[30px] font-extrabold leading-tight">This is a clickable prototype</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-white/70">
          Nothing here is real — all data is demo data. Please follow the journey by clicking the buttons that <b className="text-white">blink</b>, one step at a time.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4 rounded-2xl bg-black/20 p-4">
          <Hotspot><span className="btn btn-primary pointer-events-none h-9">Like this</span></Hotspot>
          <MousePointerClick className="text-primary" />
          <span className="text-left text-[13px] text-white/70">A pulsing green ring<br />shows your next click.</span>
        </div>

        <div className="mt-7 flex justify-center">
          <Hotspot className={ready ? '' : '[&>span]:hidden'}>
            <Button disabled={!ready} onClick={() => nav('/login')} className="!h-12 min-w-[220px] !text-[15px]">
              {ready ? <>Continue <ArrowRight size={17} /></> : `Continue in ${left}s`}
            </Button>
          </Hotspot>
        </div>
        <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/15">
          <motion.div className="h-full rounded-full bg-copilot" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: SECONDS, ease: 'linear' }} />
        </div>
      </motion.div>
    </div>
  )
}
