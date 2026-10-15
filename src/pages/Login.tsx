import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Logo } from '../components/layout/Sidebar'
import { Button } from '../components/ui/Button'
import { Hotspot } from '../components/ui/Primitives'
import { ease } from '../components/ui/motion'
import { user } from '../data/mock'

const quotes = [
  { big: '18%', text: 'Brands recover 18% of abandoned carts on WhatsApp' },
  { big: '9×', text: 'faster replies with a FAQ bot answering 24/7' },
  { big: '98%', text: 'of WhatsApp messages are opened within minutes' },
]

export default function Login() {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState(0)
  useEffect(() => { const t = setInterval(() => setQ((x) => (x + 1) % quotes.length), 4000); return () => clearInterval(t) }, [])
  const go = () => { setLoading(true); setTimeout(() => nav('/home'), 600) }

  return (
    <div className="grid min-h-full grid-cols-[1.1fr_1fr]">
      <div className="relative flex flex-col justify-between overflow-hidden bg-sidebar p-12 text-white">
        <div className="absolute -left-20 -top-20 h-[520px] w-[520px] rounded-full bg-accent/60 blur-[110px] animate-blob" />
        <div className="absolute -bottom-32 right-0 h-[520px] w-[520px] rounded-full bg-primary/60 blur-[110px] animate-blob [animation-delay:-6s]" />
        <div className="absolute left-1/3 top-1/3 h-[420px] w-[420px] rounded-full bg-accent-2/40 blur-[110px] animate-blob [animation-delay:-12s]" />
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative"><Logo /></div>
        <div className="relative max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div key={q} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease }}>
              <div className="font-display text-[96px] font-extrabold leading-none tracking-tight">{quotes[q].big}</div>
              <p className="mt-3 text-[24px] font-semibold leading-snug text-white/90">{quotes[q].text}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex gap-2">{quotes.map((_, i) => <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === q ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />)}</div>
        </div>
        <div className="relative text-[12px] text-white/50">WhatsApp · Instagram · Email · SMS · RCS · AI agents · AI voice</div>
      </div>

      <div className="relative flex items-center justify-center bg-bg p-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease }} className="relative w-full max-w-[400px]">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="glass rounded-modal border border-white/70 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
            <h1 className="text-[28px] font-bold">Welcome back</h1>
            <p className="mt-1 text-muted">Log in to your Cheerio workspace.</p>
            <button className="btn btn-secondary mt-6 w-full" onClick={go}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-8z" /><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.3 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.2V7.2H2.1a11 11 0 0 0 0 9.8z" /><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.3 1.7l3.2-3.2A11 11 0 0 0 2.1 7.2L5.8 10c.9-2.7 3.3-4.6 6.2-4.6z" /></svg>
              Continue with Google
            </button>
            <div className="my-5 flex items-center gap-3 text-[12px] text-muted"><span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" /></div>
            <label className="text-[12px] font-semibold text-muted">Email</label>
            <input defaultValue={user.email} className="input mt-1.5" />
            <label className="mt-4 block text-[12px] font-semibold text-muted">Password</label>
            <input type="password" defaultValue="••••••••••" className="input mt-1.5" />
            <Hotspot className="mt-6 w-full"><Button className="w-full" onClick={go} disabled={loading}>
              {loading ? <Loader2 size={17} className="animate-spin" /> : 'Continue'}
            </Button></Hotspot>
            <p className="mt-4 text-center text-[12px] text-muted">Demo prototype · no real auth</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
