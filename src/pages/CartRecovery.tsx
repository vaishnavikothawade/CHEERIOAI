import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Check, ShoppingCart } from 'lucide-react'
import { Badge, Card, Hotspot, PageHeader } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import ShopifyModal from '../components/copilot/ShopifyModal'
import { Chat, PhoneFrame } from '../components/phone/Phone'
import { useDemo } from '../context/DemoContext'
import { cart, inr } from '../data/mock'

const delays = ['1 hr', '4 hrs', '24 hrs']

export default function CartRecovery() {
  const nav = useNavigate()
  const { shopify, cartLive, activateCart, toast } = useDemo()
  const [modal, setModal] = useState(!shopify)
  const [delay, setDelay] = useState('1 hr')
  const connected = shopify

  const activate = () => {
    activateCart()
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.7 }, colors: ['#10B981', '#8B5CF6', '#06B6D4'] })
    toast('Cart recovery is live — Copilot will message people after ' + delay, { tone: 'copilot' })
    setTimeout(() => nav('/home'), 1600)
  }

  return (
    <>
      <PageHeader title="Abandoned cart recovery" sub="Win back shoppers who left items behind." right={<Badge kind="ai">AI</Badge>} />
      <div className={`grid grid-cols-[1fr_340px] items-start gap-8 transition ${connected ? '' : 'blur-[2px]'}`}>
        <div className="space-y-5">
          <Card hover={false} className="flex items-center gap-5 p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/15 text-warning"><ShoppingCart /></span>
            <div><div className="text-[13px] text-muted">Left in carts this week</div>
              <div className="font-display text-[28px] font-bold"><span className="tabular">{cart.carts}</span> carts · {inr(cart.value)}</div></div>
          </Card>
          <Card hover={false} className="p-6">
            <h3 className="text-[18px] font-bold">Message</h3>
            <div className="mt-3 rounded-xl bg-slate-50 p-4 text-[14px] leading-relaxed">
              Hey <b className="rounded bg-accent/10 px-1 text-accent">{'{name}'}</b>, you left <b className="rounded bg-accent/10 px-1 text-accent">{'{product}'}</b> in your cart 🛒 Complete your order in 24 hrs and get 5% off
            </div>
            <h3 className="mt-6 text-[18px] font-bold">Send after</h3>
            <div className="mt-3 inline-flex rounded-xl bg-slate-100 p-1">
              {delays.map((d) => (
                <button key={d} onClick={() => setDelay(d)} className={`relative rounded-lg px-5 py-2 text-[13px] font-semibold ${delay === d ? 'text-ink' : 'text-muted'}`}>
                  {delay === d && <motion.span layoutId="delay" transition={{ type: 'spring', stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-lg bg-white shadow" />}
                  <span className="relative">{d}</span>
                </button>
              ))}
            </div>
            <div className="mt-8">
              <Hotspot>{cartLive ? <Button disabled><Check size={16} /> Activated</Button> : <Button onClick={activate} disabled={!connected} sparkle>Activate</Button>}</Hotspot>
            </div>
          </Card>
        </div>
        <PhoneFrame name="Glow & Co.">
          <Chat msgs={[{ id: 'c', from: 'bot', text: 'Hey Ananya, you left Vitamin C Serum in your cart 🛒 Complete your order in 24 hrs and get 5% off', card: true }]} />
        </PhoneFrame>
      </div>
      <ShopifyModal open={modal} onClose={() => { setModal(false); if (!shopify) nav('/home') }} onDone={() => setModal(false)} />
    </>
  )
}
