import { AnimatePresence, motion } from 'framer-motion'
import { HelpCircle, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { Hotspot, Tooltip } from '../ui/Primitives'
import { useDemo } from '../../context/DemoContext'

export function CopilotSparkle({ size = 18 }: { size?: number }) {
  return (
    <span className="relative inline-flex">
      <Sparkles size={size} className="text-accent animate-twinkle" />
      <Sparkles size={size} className="absolute inset-0 text-accent-2 opacity-40 blur-[3px]" />
    </span>
  )
}

type Props = {
  id: string; title: string; body: string; chips?: string[]; cta: string; onCta: () => void
  why: string; delay?: number; className?: string; hotspot?: boolean; snoozeDays?: number
}

export default function NudgeCard({ id, title, body, chips, cta, onCta, why, delay = 0, className = '', hotspot = true, snoozeDays = 7 }: Props) {
  const { snoozed, snooze, unsnooze, toast } = useDemo()
  const hidden = snoozed.includes(id)

  const notNow = () => {
    snooze(id)
    toast(`Got it — we'll remind you in ${snoozeDays} days`, { tone: 'info', undo: () => unsnooze(id) })
  }

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div layout initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.3 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
          className={`grad-border bg-white p-6 shadow-glow ${className}`}>
          <div className="flex items-center gap-2">
            <CopilotSparkle />
            <span className="text-copilot text-[12px] font-bold uppercase tracking-wider">Copilot suggestion</span>
          </div>
          <h3 className="mt-3 text-[20px] font-bold leading-snug">{title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">{body}</p>
          {chips && (
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((c, i) => (
                <motion.span key={c} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay + 0.4 + i * 0.1 }}
                  className="rounded-full bg-accent/10 px-3 py-1 text-[12px] font-semibold text-accent">{c}</motion.span>
              ))}
            </div>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {hotspot ? <Hotspot><Button onClick={onCta} sparkle>{cta}</Button></Hotspot> : <Button onClick={onCta} sparkle>{cta}</Button>}
            <Button variant="ghost" onClick={notNow}>Not now</Button>
          </div>
          <div className="mt-4">
            <Tooltip text={why}>
              <span className="inline-flex cursor-help items-center gap-1 text-[12px] text-muted hover:text-ink"><HelpCircle size={13} /> Why am I seeing this?</span>
            </Tooltip>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
