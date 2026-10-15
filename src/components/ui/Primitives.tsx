import { useEffect, useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TrendingDown, TrendingUp, X } from 'lucide-react'
import { ease, item, useAnimatedNumber } from './motion'
import { useDemo } from '../../context/DemoContext'

/* ---------- Card ---------- */
export function Card({ children, className = '', hover = true, ...p }: { children: ReactNode; className?: string; hover?: boolean } & React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div variants={item}
      whileHover={hover ? { y: -3, boxShadow: '0 8px 30px rgba(16,24,40,0.10)' } : undefined}
      transition={{ duration: 0.2 }} className={`card ${className}`} {...p}>
      {children}
    </motion.div>
  )
}

/* ---------- Badge ---------- */
const badgeStyles = {
  new: 'bg-accent/10 text-accent', ai: 'bg-copilot text-white', pro: 'bg-amber-100 text-amber-700',
  live: 'bg-primary/10 text-primary-600', warn: 'bg-warning/15 text-amber-700', gray: 'bg-slate-100 text-muted',
  green: 'bg-primary/10 text-primary-600',
}
export function Badge({ kind = 'gray', children, className = '' }: { kind?: keyof typeof badgeStyles; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${badgeStyles[kind]} ${className}`}>
      {kind === 'live' && (
        <span className="relative flex h-1.5 w-1.5"><span className="absolute inset-0 rounded-full bg-primary animate-pulseRing" /><span className="h-1.5 w-1.5 rounded-full bg-primary" /></span>
      )}
      {children}
    </span>
  )
}

/* ---------- Hotspot: pulsing ring marking the next click ---------- */
export function Hotspot({ children, rounded = 'rounded-btn', className = '' }: { children: ReactNode; rounded?: string; className?: string }) {
  const { hotspots } = useDemo()
  return (
    <span className={`relative inline-flex ${className}`}>
      {hotspots && (
        <>
          <span className={`pointer-events-none absolute inset-0 ${rounded} border-2 border-primary animate-pulseRing`} />
          <span style={{ animationDelay: '0.9s' }} className={`pointer-events-none absolute inset-0 ${rounded} border-2 border-primary animate-pulseRing`} />
        </>
      )}
      {children}
    </span>
  )
}

/* ---------- Tooltip ---------- */
export function Tooltip({ text, children, side = 'top' }: { text: string; children: ReactNode; side?: 'top' | 'bottom' }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      <AnimatePresence>
        {open && text && (
          <motion.span initial={{ opacity: 0, y: side === 'top' ? 4 : -4, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className={`pointer-events-none absolute left-1/2 z-50 w-max max-w-[240px] -translate-x-1/2 rounded-lg bg-ink px-3 py-2 text-[12px] font-medium leading-snug text-white shadow-xl ${side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

/* ---------- Modal & Drawer ---------- */
export function Modal({ open, onClose, children, width = 'max-w-3xl' }: { open: boolean; onClose: () => void; children: ReactNode; width?: string }) {
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35, ease }}
            className={`glass relative w-full ${width} max-h-[90vh] overflow-auto rounded-modal border border-white/60 shadow-[0_30px_80px_rgba(15,23,42,0.25)]`}>
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-muted hover:bg-black/5"><X size={18} /></button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose} />
          <motion.aside initial={{ x: 440 }} animate={{ x: 0 }} exit={{ x: 440 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="glass absolute right-0 top-0 h-full w-[420px] overflow-auto border-l border-white/60 p-6 shadow-2xl">
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1.5 text-muted hover:bg-black/5"><X size={18} /></button>
            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Progress ring ---------- */
export function ProgressRing({ value, size = 84, stroke = 8, label }: { value: number; size?: number; stroke?: number; label?: ReactNode }) {
  const id = useId()
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8B5CF6" /><stop offset=".5" stopColor="#06B6D4" /><stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF0F4" strokeWidth={stroke} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#${id})`} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value) }} transition={{ duration: 1.1, ease }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-display text-[15px] font-bold">{label}</div>
    </div>
  )
}

/* ---------- Sparkline (draws in) ---------- */
export function Sparkline({ data, color = '#10B981', w = 84, h = 28 }: { data: number[]; color?: string; w?: number; h?: number }) {
  const min = Math.min(...data), max = Math.max(...data)
  const pts = data.map((d, i) => [(i / (data.length - 1)) * w, h - 3 - ((d - min) / (max - min || 1)) * (h - 6)])
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  return (
    <svg width={w} height={h} className="overflow-visible">
      <motion.path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease, delay: 0.3 }} />
      <motion.circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={3} fill={color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }} />
    </svg>
  )
}

/* ---------- Stat card ---------- */
export function StatCard({ label, value, prefix = '', suffix = '', trend, spark, delay = 0 }: { label: string; value: number; prefix?: string; suffix?: string; trend: number; spark: number[]; delay?: number }) {
  const v = useAnimatedNumber(value, 1200, 0, delay)
  const up = trend >= 0
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between text-[12px] font-medium text-muted">
        {label}
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${up ? 'bg-primary/10 text-primary-600' : 'bg-danger/10 text-danger'}`}>
          {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{up ? '+' : '−'}{Math.abs(trend)}%
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="tabular font-sans text-[30px] font-semibold leading-none tracking-tight">{prefix}{v.toLocaleString('en-IN')}{suffix}</div>
        <Sparkline data={spark} color={up ? '#10B981' : '#EF4444'} />
      </div>
    </Card>
  )
}

/* ---------- Dots + shimmer ---------- */
export function Dots() {
  return (
    <span className="ml-0.5 inline-flex gap-0.5">
      {[0, 1, 2].map((i) => <span key={i} style={{ animationDelay: `${i * 0.18}s` }} className="inline-block h-1 w-1 rounded-full bg-current animate-bounceDot" />)}
    </span>
  )
}

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const ini = name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  const hue = (name.charCodeAt(0) * 37) % 360
  return (
    <span style={{ width: size, height: size, background: `linear-gradient(135deg,hsl(${hue} 70% 60%),hsl(${(hue + 40) % 360} 70% 50%))` }}
      className="inline-flex shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white">{ini}</span>
  )
}

export function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="switch" aria-checked={on} onClick={() => onChange(!on)}
      className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${on ? 'bg-primary justify-end' : 'bg-slate-300 justify-start'}`}>
      <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="h-5 w-5 rounded-full bg-white shadow" />
    </button>
  )
}

export function PageHeader({ title, sub, right }: { title: ReactNode; sub?: ReactNode; right?: ReactNode }) {
  return (
    <motion.div variants={item} className="mb-7 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-[32px] font-bold leading-tight">{title}</h1>
        {sub && <p className="mt-1 text-muted">{sub}</p>}
      </div>
      {right}
    </motion.div>
  )
}
