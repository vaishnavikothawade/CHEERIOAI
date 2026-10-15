import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, MessageCircleQuestion } from 'lucide-react'
import { Badge, Card } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import { Hotspot } from '../components/ui/Primitives'
import NudgeCard from '../components/copilot/NudgeCard'
import { useAnimatedNumber } from '../components/ui/motion'
import { useDemo } from '../context/DemoContext'
import { campaign, cart, faqs, inr } from '../data/mock'

export default function BotLive() {
  const nav = useNavigate()
  const { inbox } = useDemo()
  const applied = useRef(inbox === 0).current
  const n = useAnimatedNumber(applied ? campaign.waiting : 0, 4000, 0, 600)
  const finished = n >= campaign.waiting

  return (
    <>
      <div className="relative flex flex-col items-center pb-8 pt-4 text-center">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[90px]" />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary-600 shadow-[0_12px_40px_rgba(16,185,129,0.5)]">
          <span className="absolute inset-0 rounded-full border-2 border-primary animate-pulseRing" />
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.5 4.5L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3 }} />
          </svg>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative mt-6 text-[36px] font-extrabold">Glow Assistant is live 🎉</motion.h1>
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, type: 'spring' }} className="relative mt-3"><Badge kind="live">Live</Badge></motion.div>
        <p className="relative mt-4 text-[16px] text-muted">
          {applied ? (
            finished ? <span className="font-medium text-primary-600">All {campaign.waiting} waiting customers got a reply ✓</span>
              : <>Replying to <span className="tabular inline-block w-6 font-bold text-ink">{n}</span> / {campaign.waiting} waiting customers now…</>
          ) : 'It will answer new questions instantly, 24/7.'}
        </p>
        {applied && <div className="relative mt-3 h-1.5 w-72 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-copilot" style={{ width: `${(n / campaign.waiting) * 100}%` }} /></div>}
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-5">
        <Card className="p-6"><Clock className="text-accent-2" /><div className="mt-3 text-[13px] text-muted">Avg reply time</div>
          <div className="mt-1 flex items-baseline gap-2"><span className="font-display text-[32px] font-bold">3 sec</span><span className="text-muted line-through">6 hrs</span></div></Card>
        <Card className="p-6"><MessageCircleQuestion className="text-accent" /><div className="mt-3 text-[13px] text-muted">Questions it can answer</div>
          <div className="mt-1 font-display text-[32px] font-bold">{faqs.length}</div></Card>
      </div>

      <div className="mx-auto mt-5 max-w-3xl">
        <h2 className="mb-3 text-[18px] font-bold">What's next?</h2>
        <NudgeCard id="live-cart" delay={0.9} hotspot title={`Recover abandoned carts — ${cart.carts} people left items in their cart this week (${inr(cart.value)}).`}
          body="Copilot can send a friendly reminder on WhatsApp 1 hour after they leave. Takes about 2 minutes."
          cta="Set up cart recovery" onCta={() => nav('/automations/cart-recovery')} why="Because 132 Shopify carts were abandoned in the last 7 days." />
        <div className="mt-5 flex justify-center">
          <Button variant="secondary" onClick={() => nav('/home')}>Back to Home <ArrowRight size={16} /></Button>
        </div>
      </div>
    </>
  )
}
