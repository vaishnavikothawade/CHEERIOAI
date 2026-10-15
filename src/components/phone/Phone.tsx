import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCheck } from 'lucide-react'

export type Msg = { id: string; from: 'me' | 'bot'; text: string; card?: boolean; typing?: boolean; time?: string }

export function PhoneFrame({ children, name = 'Glow Assistant', live = false }: { children: ReactNode; name?: string; live?: boolean }) {
  return (
    <div className="relative mx-auto h-[620px] w-[300px] rounded-[44px] bg-slate-900 p-[10px] shadow-[0_30px_80px_rgba(15,23,42,0.35),inset_0_0_0_2px_#334155]">
      <div className="absolute left-1/2 top-[10px] z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-900" />
      <div className="flex h-full flex-col overflow-hidden rounded-[34px] bg-[#ECE5DD]">
        <div className="flex items-center gap-2.5 bg-[#075E54] px-3 pb-3 pt-8 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent-2 text-[12px] font-bold">G</span>
          <div className="leading-tight"><div className="text-[13px] font-semibold">{name}</div><div className="text-[10px] opacity-80">{live ? 'online' : 'business account'}</div></div>
        </div>
        <div className="relative flex-1 overflow-hidden"
          style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '14px 14px' }}>
          {children}
        </div>
        <div className="flex items-center gap-2 bg-[#F0F0F0] px-2.5 py-2"><div className="flex-1 rounded-full bg-white px-3 py-1.5 text-[11px] text-slate-400">Type a message</div><span className="h-7 w-7 rounded-full bg-[#075E54]" /></div>
      </div>
    </div>
  )
}

export function Bubble({ m }: { m: Msg }) {
  const me = m.from === 'me'
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      style={{ originX: me ? 1 : 0, originY: 1 }} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[12px] leading-snug text-slate-800 shadow-sm ${me ? 'rounded-tr-none bg-[#DCF8C6]' : 'rounded-tl-none bg-white'}`}>
        {m.typing ? (
          <span className="flex gap-1 py-1.5">{[0, 1, 2].map((i) => <span key={i} style={{ animationDelay: `${i * 0.18}s` }} className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounceDot" />)}</span>
        ) : (
          <>
            {m.card && (
              <div className="-mx-1 -mt-0.5 mb-1.5 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                <div className="flex h-20 items-center justify-center bg-gradient-to-br from-amber-200 via-orange-300 to-rose-300 text-3xl">🧴</div>
                <div className="px-2 py-1.5"><div className="text-[11px] font-semibold">Vitamin C Serum</div><div className="text-[11px] text-slate-500"><s>₹799</s> <b className="text-emerald-600">₹599</b></div></div>
                <div className="border-t border-slate-100 py-1.5 text-center text-[11px] font-semibold text-sky-600">Buy now</div>
              </div>
            )}
            <span className="whitespace-pre-line">{m.text}</span>
            <span className="ml-2 inline-flex translate-y-1 items-center gap-0.5 text-[9px] text-slate-400">{m.time ?? '7:42 PM'}{me && <CheckCheck size={11} className="text-sky-500" />}</span>
          </>
        )}
      </div>
    </motion.div>
  )
}

export function Chat({ msgs }: { msgs: Msg[] }) {
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [msgs])
  return (
    <div className="absolute inset-0 flex flex-col gap-2 overflow-y-auto p-3">
      <div className="mx-auto my-1 rounded-md bg-[#FFF3C4]/80 px-2 py-0.5 text-[10px] text-slate-600">Today</div>
      <AnimatePresence initial={false}>{msgs.map((m) => <Bubble key={m.id} m={m} />)}</AnimatePresence>
      <div ref={end} />
    </div>
  )
}
