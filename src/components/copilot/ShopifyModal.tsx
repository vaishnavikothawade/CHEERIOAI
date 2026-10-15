import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Link2, Loader2, ShoppingBag } from 'lucide-react'
import { Modal } from '../ui/Primitives'
import { Button } from '../ui/Button'
import { useDemo } from '../../context/DemoContext'
import { user } from '../../data/mock'

/** 3-step mini flow: enter URL → fake OAuth → connected */
export default function ShopifyModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const { setShopify, toast } = useDemo()

  const connect = () => {
    setStep(1)
    setTimeout(() => { setStep(2); setShopify(true); toast('Shopify connected', { tone: 'success' }) }, 1800)
  }
  const close = () => { onClose(); setTimeout(() => setStep(0), 300) }

  return (
    <Modal open={open} onClose={close} width="max-w-md">
      <div className="p-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#95BF47]/15 text-[#5E8E3E]"><ShoppingBag /></div>
        <h2 className="text-[24px] font-bold">Connect Shopify first</h2>
        <p className="mt-1 text-muted">Copilot needs your store to see carts and orders. Takes about 20 seconds.</p>

        <div className="mt-5 flex items-center gap-2">
          {['Store', 'Authorise', 'Done'].map((l, i) => (
            <div key={l} className="flex flex-1 flex-col gap-1.5">
              <div className="h-1 overflow-hidden rounded-full bg-slate-200"><motion.div className="h-full bg-primary" animate={{ width: i <= step ? '100%' : '0%' }} transition={{ duration: 0.5 }} /></div>
              <span className={`text-[11px] font-medium ${i <= step ? 'text-ink' : 'text-muted'}`}>{l}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 min-h-[110px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <label className="text-[12px] font-semibold text-muted">Store URL</label>
                <div className="relative mt-1.5"><Link2 size={15} className="absolute left-3 top-3 text-muted" /><input readOnly defaultValue={user.shopify} className="input pl-9" /></div>
                <Button className="mt-4 w-full" onClick={connect}>Connect with Shopify</Button>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3 py-5 text-muted">
                <Loader2 className="animate-spin text-primary" size={30} />
                Waiting for Shopify to authorise…
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3 py-2">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }} className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white"><Check size={28} strokeWidth={3} /></motion.span>
                <div className="font-semibold">Connected ✓ <span className="font-normal text-muted">{user.shopify}</span></div>
                <Button className="w-full" onClick={() => { close(); onDone() }}>Continue</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Modal>
  )
}
