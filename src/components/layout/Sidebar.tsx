import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart3, Bot, Contact, Home, Inbox, Megaphone, Plug, Settings, Workflow, type LucideIcon } from 'lucide-react'
import { useDemo } from '../../context/DemoContext'
import { useAnimatedNumber } from '../ui/motion'
import { user } from '../../data/mock'

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-b from-primary to-primary-600 shadow-[0_4px_14px_rgba(16,185,129,.45)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5z" /></svg>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-sidebar bg-accent-2" />
      </span>
      <span className={`font-display text-[20px] font-bold tracking-tight ${dark ? 'text-ink' : 'text-white'}`}>cheerio</span>
    </div>
  )
}

export default function Sidebar() {
  const { botLive, inbox, done, shopify, trial } = useDemo()
  const { pathname } = useLocation()
  const inboxN = useAnimatedNumber(inbox, 1400, 64)

  const items: { to: string; label: string; icon: LucideIcon; badge?: React.ReactNode; dot?: boolean; match?: string }[] = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/campaigns/diwali-glow-sale', label: 'Campaigns', icon: Megaphone, match: '/campaigns' },
    { to: '/inbox', label: 'Inbox', icon: Inbox, badge: inboxN > 0 && <span className="tabular rounded-full bg-warning px-1.5 py-0.5 text-[10px] font-bold text-sidebar">{inboxN}</span> },
    {
      to: botLive ? '/chatbots/glow-assistant' : '/chatbots', label: 'Chatbots', icon: Bot, match: '/chatbots',
      badge: botLive ? <LiveDot /> : <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">NEW</span>, dot: !botLive,
    },
    { to: '/automations', label: 'Automations', icon: Workflow, dot: !done.includes('cart-recovery') },
    { to: '/contacts', label: 'Contacts', icon: Contact, dot: !trial },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/integrations', label: 'Integrations', icon: Plug, badge: shopify && <span className="text-[10px] font-semibold text-primary">1 on</span> },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[248px] flex-col bg-sidebar px-3 py-5">
      <div className="px-3 pb-6 pt-1"><Logo /></div>
      <nav className="flex flex-1 flex-col gap-0.5">
        {items.map((it) => {
          const active = it.match ? pathname.startsWith(it.match) : pathname === it.to
          return (
            <NavLink key={it.label} to={it.to} className="group relative flex h-10 items-center gap-3 rounded-[10px] px-3 text-[14px] font-medium text-slate-400 transition-colors hover:bg-sidebar-hover hover:text-white">
              {active && <motion.span layoutId="sidebar-active" transition={{ type: 'spring', stiffness: 400, damping: 34 }} className="absolute inset-0 rounded-[10px] bg-sidebar-hover ring-1 ring-white/10" />}
              {active && <motion.span layoutId="sidebar-bar" className="absolute -left-3 h-5 w-1 rounded-r-full bg-primary" />}
              <motion.span className={`relative flex items-center gap-3 ${active ? 'text-white' : ''}`} whileHover={{ x: 2 }}>
                <it.icon size={18} className={active ? 'text-primary' : ''} />
                {it.label}
              </motion.span>
              <span className="relative ml-auto flex items-center gap-2">
                {it.dot && <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#8B5CF6]" />}
                {it.badge}
              </span>
            </NavLink>
          )
        })}
      </nav>
      <div className="mx-1 mb-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
        <div className="flex items-center justify-between text-[12px] text-slate-400">Plan <span className="font-semibold text-white">{user.plan}</span></div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div initial={{ width: 0 }} animate={{ width: '62%' }} transition={{ duration: 1.2, delay: 0.4 }} className="h-full rounded-full bg-copilot" />
        </div>
        <div className="mt-1.5 text-[11px] text-slate-500">5,200 / 8,400 contacts used</div>
      </div>
      <NavLink to="/settings" className="flex h-10 items-center gap-3 rounded-[10px] px-3 text-[14px] font-medium text-slate-400 transition-colors hover:bg-sidebar-hover hover:text-white">
        <Settings size={18} /> Settings
      </NavLink>
    </aside>
  )
}

export function LiveDot() {
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary">
      <span className="relative flex h-2 w-2"><span className="absolute inset-0 rounded-full bg-primary animate-pulseRing" /><span className="h-2 w-2 rounded-full bg-primary" /></span>Live
    </span>
  )
}
