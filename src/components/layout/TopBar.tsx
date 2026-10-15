import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Search, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { Avatar, Drawer } from '../ui/Primitives'
import { useDemo } from '../../context/DemoContext'
import { campaign, cart, user } from '../../data/mock'

export default function TopBar() {
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const { botLive, done } = useDemo()

  const go = (to: string) => { setOpen(false); nav(to) }
  const suggestions = [
    !botLive && { t: `${campaign.waiting} customers are waiting for a reply`, s: 'A FAQ bot answers them instantly.', cta: 'Open campaign report', to: '/campaigns/diwali-glow-sale' },
    !done.includes('cart-recovery') && { t: `${cart.carts} people left items in their cart`, s: 'Win back ₹96,400 with a WhatsApp reminder.', cta: 'Set up cart recovery', to: '/automations/cart-recovery' },
    { t: 'Your repeat buyers spend 3.2× more', s: 'Create a segment and message them first.', cta: 'Explore segments', to: '/contacts/segments' },
  ].filter(Boolean) as { t: string; s: string; cta: string; to: string }[]

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-black/[0.05] bg-bg/70 px-8 backdrop-blur-xl">
      <label className="flex h-10 w-[360px] items-center gap-2.5 rounded-btn border border-line bg-white px-3 text-muted shadow-sm transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
        <Search size={16} />
        <input placeholder="Search campaigns, contacts, chatbots…" className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted" />
        <kbd className="rounded-md border border-line bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium">⌘K</kbd>
      </label>
      <div className="ml-auto flex items-center gap-3">
        <Button variant="copilot" onClick={() => setOpen(true)}>Copilot</Button>
        <button aria-label="Notifications" className="relative rounded-full p-2 text-muted transition hover:bg-black/5 hover:text-ink">
          <Bell size={19} />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">3</span>
        </button>
        <button className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition hover:bg-black/5">
          <Avatar name={user.name} size={32} />
          <span className="text-left leading-tight"><span className="block text-[13px] font-semibold">Priya</span><span className="block text-[11px] text-muted">{user.company}</span></span>
          <ChevronDown size={14} className="text-muted" />
        </button>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center gap-2"><Sparkles className="text-accent" size={20} /><h2 className="text-copilot text-[22px] font-bold">Growth Copilot</h2></div>
        <p className="mt-1 text-muted">Suggestions based on your own numbers.</p>
        <div className="mt-6 space-y-3">
          {suggestions.map((s) => (
            <div key={s.t} className="grad-border bg-white p-4">
              <div className="font-semibold">{s.t}</div>
              <div className="mt-0.5 text-[13px] text-muted">{s.s}</div>
              <Button className="mt-3 h-9" onClick={() => go(s.to)}>{s.cta}</Button>
            </div>
          ))}
        </div>
      </Drawer>
    </header>
  )
}
