import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Loader2, Plus, Rocket, Send } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge, Card, Dots, Hotspot, Switch, Tooltip } from '../components/ui/Primitives'
import { CopilotSparkle } from '../components/copilot/NudgeCard'
import ShopifyModal from '../components/copilot/ShopifyModal'
import { Chat, PhoneFrame, type Msg } from '../components/phone/Phone'
import { useDemo } from '../context/DemoContext'
import { campaign, faqs, user, type Faq } from '../data/mock'
import { ease, useTypewriter } from '../components/ui/motion'

const questions: Record<string, string> = {
  price: "What's the price of the Vitamin C serum?", cod: 'Is COD available?', ship: 'How long does shipping take?',
  returns: "What's your return policy?", order: 'Where is my order?',
}
const tones = {
  Friendly: "Hi there! 👋 I'm Glow Assistant. How can I help you today?",
  Professional: 'Hello, and welcome to Glow & Co. How may I assist you today?',
  Fun: 'Heyyy glow-getter! ✨ Ask me anything — products, orders, offers!',
} as const
type Tone = keyof typeof tones
const steps = ['Answers', 'Personalise', 'Test & go live']
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function BotSetup() {
  const nav = useNavigate()
  const { shopify, goLive, toast } = useDemo()
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<'reading' | 'typing' | 'ready'>('reading')
  const [active, setActive] = useState(0)
  const [items, setItems] = useState<Faq[]>(faqs)
  const [reviewed, setReviewed] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)
  const [tone, setTone] = useState<Tone>('Friendly')
  const [langs, setLangs] = useState(['English', 'Hindi'])
  const [handover, setHandover] = useState(true)
  const [name, setName] = useState('Glow Assistant')
  const [shopOpen, setShopOpen] = useState(false)
  const [apply, setApply] = useState(true)
  const [test, setTest] = useState<Msg[] | null>(null)
  const [testing, setTesting] = useState(false)
  const [live, setLive] = useState<'idle' | 'loading' | 'done'>('idle')

  useEffect(() => { const t = setTimeout(() => setPhase('typing'), 1700); return () => clearTimeout(t) }, [])
  const typed = (i: number) => { setFocus(items[i].id); i + 1 >= items.length ? setPhase('ready') : setActive(i + 1) }

  const edit = (id: string, a: string) => {
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, a } : x)))
    setFocus(id)
    if (id === 'returns') setReviewed(true)
  }
  const ready = phase === 'ready'
  const flagged = items.some((x) => x.flagged) && !reviewed

  // phone preview: greeting + the answer being edited
  const preview = useMemo<Msg[]>(() => {
    const m: Msg[] = [{ id: 'g', from: 'bot', text: tones[tone] }]
    const f = items.find((x) => x.id === focus)
    if (f?.a) m.push({ id: 'q' + f.id, from: 'me', text: f.id.startsWith('new') ? f.q : questions[f.key] ?? f.q }, { id: 'a' + f.id, from: 'bot', text: f.a })
    return m
  }, [tone, items, focus])

  const runTest = async () => {
    setTesting(true); setTest([])
    const push = (m: Msg) => setTest((x) => [...(x ?? []).filter((y) => !y.typing), m])
    const typing = (id: string) => setTest((x) => [...(x ?? []), { id, from: 'bot', text: '', typing: true }])
    const a = (k: string) => items.find((x) => x.key === k)!.a
    await sleep(500); push({ id: 'c1', from: 'me', text: 'Hi, is COD available?' })
    await sleep(500); typing('t1'); await sleep(1400); push({ id: 'b1', from: 'bot', text: a('cod') })
    await sleep(1200); push({ id: 'c2', from: 'me', text: 'price of vitamin c serum?' })
    await sleep(500); typing('t2'); await sleep(1400); push({ id: 'b2', from: 'bot', text: a('price').split(' See all')[0], card: true })
    setTesting(false)
  }

  const goLiveNow = async () => {
    setLive('loading'); await sleep(1500); setLive('done'); goLive(apply)
    const end = Date.now() + 900
    ;(function f() {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors: ['#10B981', '#8B5CF6', '#06B6D4', '#F59E0B'] })
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors: ['#10B981', '#8B5CF6', '#06B6D4', '#F59E0B'] })
      if (Date.now() < end) requestAnimationFrame(f)
    })()
    confetti({ particleCount: 140, spread: 100, startVelocity: 45, origin: { y: 0.6 }, colors: ['#10B981', '#8B5CF6', '#06B6D4', '#F59E0B'] })
    await sleep(1800); nav('/chatbots/glow-assistant')
  }

  const addQ = () => {
    const id = 'new' + items.length
    setItems((x) => [...x, { id, key: id, q: 'New question', a: '' }])
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <div>
          <h1 className="text-[32px] font-bold leading-tight">Set up your FAQ bot</h1>
          <p className="mt-1 text-muted">Template: <b className="text-ink">D2C FAQ Bot</b> · Copilot does most of the work.</p>
        </div>
      </div>

      <Stepper step={step} />

      <div className="mt-6 grid grid-cols-[1fr_340px] items-start gap-8">
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease }}>
              {step === 0 && (
                <div className="space-y-4">
                  <div className="grad-border flex items-center gap-3 bg-white px-5 py-4 shadow-glow">
                    <CopilotSparkle size={20} />
                    <div className="text-[14px] font-medium">
                      {ready ? <>Copilot drafted {items.length} answers from {user.site} and your last {campaign.replies} replies.</> : <>Copilot is reading {user.site} and your last {campaign.replies} replies<Dots /></>}
                    </div>
                  </div>
                  {items.map((f, i) => (
                    <AnswerCard key={f.id} f={f} idx={i} phase={phase} active={active} onTyped={() => typed(i)}
                      reviewed={reviewed} onReview={() => setReviewed(true)} onFocus={() => setFocus(f.id)}
                      onChange={(a) => edit(f.id, a)} onQ={(q) => setItems((xs) => xs.map((x) => (x.id === f.id ? { ...x, q } : x)))}
                      shopify={shopify} onShopify={() => setShopOpen(true)} />
                  ))}
                  {ready && <Button variant="secondary" onClick={addQ}><Plus size={16} /> Add question</Button>}
                </div>
              )}

              {step === 1 && (
                <Card hover={false} className="space-y-6 p-6">
                  <div>
                    <label className="text-[12px] font-semibold text-muted">Bot name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="input mt-1.5 max-w-sm" />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-muted">Tone of voice</label>
                    <div className="relative mt-1.5 inline-flex rounded-xl bg-slate-100 p-1">
                      {(Object.keys(tones) as Tone[]).map((t) => (
                        <button key={t} onClick={() => setTone(t)} className={`relative rounded-lg px-4 py-1.5 text-[13px] font-semibold ${tone === t ? 'text-ink' : 'text-muted'}`}>
                          {tone === t && <motion.span layoutId="tone" transition={{ type: 'spring', stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-lg bg-white shadow" />}
                          <span className="relative">{t}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-muted">Languages</label>
                    <div className="mt-1.5 flex gap-2">
                      {['English', 'Hindi', 'Marathi'].map((l) => {
                        const on = langs.includes(l)
                        return (
                          <motion.button whileTap={{ scale: 0.95 }} key={l} onClick={() => setLangs((x) => (on ? x.filter((y) => y !== l) : [...x, l]))}
                            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition ${on ? 'border-primary bg-primary/10 text-primary-600' : 'border-line bg-white text-muted'}`}>
                            {on && <Check size={13} strokeWidth={3} />}{l}
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-line p-4">
                    <div><div className="font-semibold">Hand over to a human 10am–7pm</div><div className="text-[13px] text-muted">During business hours your team can jump into any chat.</div></div>
                    <Switch on={handover} onChange={setHandover} />
                  </div>
                  <div className="rounded-xl border border-line p-4">
                    <div className="text-[12px] font-semibold text-muted">Fallback</div>
                    <div className="mt-1 font-medium">If the bot can't answer → assign to <span className="rounded-md bg-slate-100 px-1.5 py-0.5">Priya</span> in Inbox</div>
                  </div>
                </Card>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <Card hover={false} className="p-6">
                    <h3 className="text-[18px] font-bold">Try it yourself</h3>
                    <p className="mt-1 text-muted">Copilot will play a short conversation in the preview on the right.</p>
                    <Button variant="secondary" className="mt-4" onClick={runTest} disabled={testing}>
                      {testing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Send a test to your WhatsApp: {user.phone}
                    </Button>
                    {test && !testing && <div className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-primary-600"><Check size={15} /> Test delivered — looks great!</div>}
                  </Card>
                  <Card hover={false} className="flex items-center justify-between p-6">
                    <div><div className="font-semibold">Apply to the {campaign.waiting} waiting customers now</div><div className="text-[13px] text-muted">They'll get an instant reply.</div></div>
                    <Switch on={apply} onChange={setApply} />
                  </Card>
                  {flagged && (
                    <button onClick={() => setStep(0)} className="flex w-full items-center gap-2 rounded-xl bg-warning/10 px-4 py-3 text-left text-[13px] font-medium text-amber-700">
                      <AlertTriangle size={16} /> 1 answer needs your review before you can go live. <span className="ml-auto underline">Review now</span>
                    </button>
                  )}
                  <div className="flex justify-center pt-2">
                    <Tooltip text={flagged ? 'Review 1 flagged answer first' : ''} side="top">
                      <Hotspot rounded="rounded-full">
                        <motion.button layout disabled={flagged || live !== 'idle'} onClick={goLiveNow} whileTap={{ scale: 0.97 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                          className={`btn btn-primary !h-14 text-[16px] ${live === 'idle' ? '!rounded-btn px-10' : '!w-14 !rounded-full !px-0'}`}>
                          <AnimatePresence mode="wait" initial={false}>
                            {live === 'idle' && <motion.span key="i" exit={{ opacity: 0 }} className="flex items-center gap-2"><Rocket size={18} /> Go Live</motion.span>}
                            {live === 'loading' && <motion.span key="l" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><Loader2 className="animate-spin" /></motion.span>}
                            {live === 'done' && <motion.span key="d" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 14 }}><Check size={26} strokeWidth={3} /></motion.span>}
                          </AnimatePresence>
                        </motion.button>
                      </Hotspot>
                    </Tooltip>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="ghost" onClick={() => (step === 0 ? nav('/campaigns/diwali-glow-sale') : setStep(step - 1))} disabled={live !== 'idle'}><ArrowLeft size={16} /> Back</Button>
            {step < 2 && (
              <Hotspot><Button disabled={!ready} onClick={() => setStep(step + 1)}>Continue <ArrowRight size={16} /></Button></Hotspot>
            )}
          </div>
        </div>

        <div className="sticky top-24">
          <PhoneFrame name={name} live={live === 'done'}>
            <Chat msgs={step === 2 && test ? test : preview} />
          </PhoneFrame>
          <p className="mt-3 text-center text-[12px] text-muted">Live preview{step === 2 ? ' · test conversation' : ''}</p>
        </div>
      </div>

      <ShopifyModal open={shopOpen} onClose={() => setShopOpen(false)} onDone={() => toast('Live order tracking enabled')} />
    </>
  )
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center">
      {steps.map((s, i) => (
        <div key={s} className={`flex items-center ${i < 2 ? 'flex-1' : ''}`}>
          <div className="flex items-center gap-2.5">
            <motion.span animate={{ backgroundColor: i <= step ? '#10B981' : '#E5E7EB', color: i <= step ? '#fff' : '#64748B', scale: i === step ? 1.1 : 1 }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold">{i < step ? <Check size={16} strokeWidth={3} /> : i + 1}</motion.span>
            <span className={`text-[14px] font-semibold ${i <= step ? 'text-ink' : 'text-muted'}`}>{s}</span>
          </div>
          {i < 2 && <div className="mx-4 h-0.5 flex-1 overflow-hidden rounded-full bg-slate-200"><motion.div className="h-full bg-primary" animate={{ width: i < step ? '100%' : '0%' }} transition={{ duration: 0.6, ease }} /></div>}
        </div>
      ))}
    </div>
  )
}

function AnswerCard({ f, idx, phase, active, onTyped, reviewed, onReview, onFocus, onChange, onQ, shopify, onShopify }: {
  f: Faq; idx: number; phase: string; active: number; onTyped: () => void; reviewed: boolean; onReview: () => void
  onFocus: () => void; onChange: (a: string) => void; onQ: (q: string) => void; shopify: boolean; onShopify: () => void
}) {
  const original = useRef(f.a).current
  const isNew = f.id.startsWith('new')
  const typing = phase === 'typing' && active === idx
  const waiting = !isNew && (phase === 'reading' || (phase === 'typing' && idx > active))
  const text = useTypewriter(original, typing, 14)
  useEffect(() => { if (typing && text.length === original.length) onTyped() }, [text, typing])
  const flagged = f.flagged && !reviewed

  return (
    <Card hover={false} className={`p-5 ${flagged ? '!border-warning/50 ring-2 ring-warning/20' : ''}`}>
      <div className="flex items-center gap-2">
        {isNew ? <input value={f.q} onChange={(e) => onQ(e.target.value)} className="rounded-full bg-accent/10 px-3 py-1 text-[12px] font-semibold text-accent outline-none" />
          : <span className="rounded-full bg-accent/10 px-3 py-1 text-[12px] font-semibold text-accent">{f.q}</span>}
        {f.flagged && (
          <AnimatePresence>
            {flagged ? <motion.span key="f" exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-bold text-amber-700"><AlertTriangle size={11} /> Needs your review</motion.span>
              : <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary-600"><Check size={11} strokeWidth={3} /> Reviewed</motion.span>}
          </AnimatePresence>
        )}
        {f.key === 'order' && (
          <span className="ml-auto flex items-center gap-2 text-[12px] text-muted">Connect Shopify for live tracking <Switch on={shopify} onChange={(v) => v && onShopify()} /></span>
        )}
      </div>
      <div className="mt-3">
        {waiting ? (
          <div className="space-y-2"><div className="shimmer h-3.5 w-full" /><div className="shimmer h-3.5 w-2/3" /></div>
        ) : (
          <textarea rows={2} readOnly={typing} value={typing ? text : f.a} onFocus={onFocus} onChange={(e) => onChange(e.target.value)} placeholder="Type the answer…"
            className="w-full resize-none rounded-xl border border-line bg-slate-50/60 p-3 text-[14px] outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
        )}
      </div>
      {flagged && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-warning/10 p-3 text-[13px] text-amber-800">
            Copilot wasn't sure about your return window. Please confirm.
            <Button variant="secondary" className="h-8 shrink-0 !px-3" onClick={onReview}><Check size={14} /> Looks good</Button>
          </div>
        </motion.div>
      )}
    </Card>
  )
}
