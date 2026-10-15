import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { Badge, Card, Hotspot, ProgressRing } from '../ui/Primitives'
import { Button } from '../ui/Button'
import { useDemo } from '../../context/DemoContext'
import { checklist, type CheckId } from '../../data/mock'

const routes: Record<CheckId, string> = {
  campaign: '/campaigns/diwali-glow-sale', 'faq-bot': '/campaigns/diwali-glow-sale',
  'cart-recovery': '/automations/cart-recovery', segments: '/contacts/segments',
}

export default function GrowthChecklist() {
  const { done, seenDone, markSeen, toast } = useDemo()
  const nav = useNavigate()
  // `shown` lags behind `done` so returning to Home plays the completion animation
  const [shown, setShown] = useState<CheckId[]>(seenDone)

  useEffect(() => {
    if (shown.length === done.length) return
    const t = setTimeout(() => {
      setShown(done); markSeen()
      toast("Nice! You've unlocked 1 new feature this week.", { tone: 'copilot' })
    }, 900)
    return () => clearTimeout(t)
  }, [done])

  const next = checklist.find((c) => !shown.includes(c.id))?.id
  return (
    <Card hover={false} className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold">Grow your store</h2>
          <p className="mt-0.5 text-muted">Copilot picks the next best feature for you.</p>
        </div>
        <ProgressRing value={shown.length / 4} label={<span className="tabular">{shown.length}<span className="text-muted">/4</span></span>} />
      </div>
      <div className="mt-5 space-y-2">
        {checklist.map((c, i) => {
          const isDone = shown.includes(c.id)
          const open = next === c.id
          return (
            <motion.div layout key={c.id} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={() => !isDone && nav(routes[c.id])}
              className={`relative overflow-hidden rounded-xl border p-4 ${open ? 'cursor-pointer border-primary/30 bg-gradient-to-r from-primary/[0.07] to-accent-2/[0.05] shadow-sm' : isDone ? 'border-transparent bg-slate-50' : 'cursor-pointer border-line bg-white hover:border-slate-300'}`}>
              <div className="flex items-center gap-3.5">
                <Checkbox done={isDone} index={i + 1} />
                <div className="min-w-0 flex-1">
                  <div className={`flex items-center gap-2 font-semibold transition-colors ${isDone ? 'text-muted line-through' : ''}`}>
                    {c.title}{c.badge && <Badge kind="pro">{c.badge}</Badge>}
                  </div>
                  <AnimatePresence initial={false}>
                    {(open || (!isDone && !open)) && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-0.5 text-[13px] text-muted">{c.sub}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {open && (
                  <Hotspot><Button className="h-9" onClick={(e) => { e.stopPropagation(); nav(routes[c.id]) }}>{c.cta}<ChevronRight size={15} /></Button></Hotspot>
                )}
                {!open && !isDone && <ChevronRight size={16} className="text-slate-300" />}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}

function Checkbox({ done, index }: { done: boolean; index: number }) {
  return (
    <motion.span animate={done ? { scale: [1, 1.25, 1] } : {}} transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold ${done ? 'border-primary bg-primary text-white' : 'border-slate-300 text-slate-400'}`}>
      {done ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M5 12.5l4.5 4.5L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
        </svg>
      ) : index}
    </motion.span>
  )
}
