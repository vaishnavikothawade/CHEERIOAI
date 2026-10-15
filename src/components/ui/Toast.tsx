import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react'
import { useDemo } from '../../context/DemoContext'

const icons = {
  success: <CheckCircle2 size={18} className="text-primary" />,
  info: <Info size={18} className="text-accent-2" />,
  copilot: <Sparkles size={18} className="text-accent" />,
}

export function Toaster() {
  const { toasts, dismissToast } = useDemo()
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id} layout initial={{ opacity: 0, x: 60, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="glass pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border border-white/70 py-3 pl-4 pr-3 shadow-[0_12px_40px_rgba(15,23,42,0.18)]">
            {icons[t.tone ?? 'success']}
            <span className="text-[13px] font-medium">{t.text}</span>
            {t.undo && (
              <button onClick={() => { t.undo!(); dismissToast(t.id) }} className="rounded-md px-2 py-1 text-[12px] font-semibold text-accent hover:bg-accent/10">Undo</button>
            )}
            <button onClick={() => dismissToast(t.id)} aria-label="Dismiss" className="rounded-full p-1 text-muted hover:bg-black/5"><X size={14} /></button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
