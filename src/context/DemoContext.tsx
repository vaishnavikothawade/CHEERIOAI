import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CheckId } from '../data/mock'

export type ToastItem = { id: number; text: string; tone?: 'success' | 'info' | 'copilot'; undo?: () => void }

type State = {
  done: CheckId[]            // actual progress
  seenDone: CheckId[]        // what Home has already animated
  botLive: boolean
  inbox: number
  snoozed: string[]
  shopify: boolean
  cartLive: boolean
  trial: boolean
  hotspots: boolean
  toasts: ToastItem[]
}

const initial: State = {
  done: ['campaign'], seenDone: ['campaign'], botLive: false, inbox: 64, snoozed: [],
  shopify: false, cartLive: false, trial: false, hotspots: true, toasts: [],
}

type Ctx = State & {
  toast: (text: string, opts?: { tone?: ToastItem['tone']; undo?: () => void }) => void
  dismissToast: (id: number) => void
  complete: (id: CheckId) => void
  markSeen: () => void
  goLive: (clearInbox: boolean) => void
  snooze: (id: string) => void
  unsnooze: (id: string) => void
  setShopify: (v: boolean) => void
  activateCart: () => void
  startTrial: () => void
  setHotspots: (v: boolean) => void
  reset: () => void
}

const DemoContext = createContext<Ctx>(null!)
export const useDemo = () => useContext(DemoContext)

let tid = 0

export function DemoProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<State>(initial)
  const patch = useCallback((p: Partial<State> | ((s: State) => Partial<State>)) =>
    setS((cur) => ({ ...cur, ...(typeof p === 'function' ? p(cur) : p) })), [])

  const dismissToast = useCallback((id: number) => patch((c) => ({ toasts: c.toasts.filter((t) => t.id !== id) })), [patch])
  const toast = useCallback<Ctx['toast']>((text, opts) => {
    const id = ++tid
    patch((c) => ({ toasts: [...c.toasts, { id, text, tone: opts?.tone ?? 'success', undo: opts?.undo }] }))
    setTimeout(() => dismissToast(id), opts?.undo ? 6000 : 4000)
  }, [patch, dismissToast])

  const value = useMemo<Ctx>(() => ({
    ...s, toast, dismissToast,
    complete: (id) => patch((c) => (c.done.includes(id) ? {} : { done: [...c.done, id] })),
    markSeen: () => patch((c) => ({ seenDone: c.done })),
    goLive: (clearInbox) => patch((c) => ({
      botLive: true, inbox: clearInbox ? 0 : c.inbox, done: c.done.includes('faq-bot') ? c.done : [...c.done, 'faq-bot'],
    })),
    snooze: (id) => patch((c) => ({ snoozed: [...c.snoozed, id] })),
    unsnooze: (id) => patch((c) => ({ snoozed: c.snoozed.filter((x) => x !== id) })),
    setShopify: (v) => patch({ shopify: v }),
    activateCart: () => patch((c) => ({ cartLive: true, done: c.done.includes('cart-recovery') ? c.done : [...c.done, 'cart-recovery'] })),
    startTrial: () => patch({ trial: true }),
    setHotspots: (v) => patch({ hotspots: v }),
    reset: () => setS({ ...initial, hotspots: s.hotspots }),
  }), [s, toast, dismissToast, patch])

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}
