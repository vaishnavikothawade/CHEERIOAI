import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bot, Contact, Inbox, Megaphone, Plug, Settings, Sparkles, Workflow, BarChart3, type LucideIcon } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { item } from '../components/ui/motion'
import { useDemo } from '../context/DemoContext'

const pages: Record<string, { title: string; icon: LucideIcon; line: string; cta?: string; to?: string }> = {
  campaigns: { title: 'Campaigns', icon: Megaphone, line: 'All your WhatsApp broadcasts live here.', cta: 'Open Diwali Glow Sale', to: '/campaigns/diwali-glow-sale' },
  inbox: { title: 'Inbox', icon: Inbox, line: 'Every customer conversation, in one place.' },
  chatbots: { title: 'Chatbots', icon: Bot, line: 'Answer customers 24/7 — no code needed.', cta: 'Create your first chatbot', to: '/campaigns/diwali-glow-sale' },
  automations: { title: 'Automations', icon: Workflow, line: 'Set up flows that run while you sleep.', cta: 'Try cart recovery', to: '/automations/cart-recovery' },
  contacts: { title: 'Contacts', icon: Contact, line: '8,400 contacts, ready to be segmented.', cta: 'Explore segments', to: '/contacts/segments' },
  analytics: { title: 'Analytics', icon: BarChart3, line: 'Deeper reports are coming to this demo soon.' },
  integrations: { title: 'Integrations', icon: Plug, line: 'Connect Shopify, Razorpay and more.' },
  settings: { title: 'Settings', icon: Settings, line: 'Workspace, team and billing preferences.' },
}

export default function Placeholder() {
  const key = useLocation().pathname.split('/')[1]
  const p = pages[key] ?? { title: 'Coming soon', icon: Sparkles, line: 'This page is not part of the demo.' }
  const nav = useNavigate()
  const { botLive } = useDemo()
  const to = key === 'chatbots' && botLive ? '/chatbots/glow-assistant' : p.to
  return (
    <motion.div variants={item} className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-copilot opacity-30 blur-2xl" />
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-accent shadow-glow"><p.icon size={40} /></motion.div>
      </div>
      <h1 className="mt-8 text-[28px] font-bold">{p.title}</h1>
      <p className="mt-2 max-w-sm text-muted">{p.line}</p>
      <div className="mt-6 flex gap-2">
        {p.cta && to && <Button onClick={() => nav(to)} sparkle>{p.cta}</Button>}
        <Button variant="secondary" onClick={() => nav('/home')}>Back to Home</Button>
      </div>
    </motion.div>
  )
}
