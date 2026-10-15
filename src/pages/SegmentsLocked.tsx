import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Lock, Users } from 'lucide-react'
import { Avatar, Badge, Card, PageHeader } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import { useDemo } from '../context/DemoContext'
import { repeatBuyers } from '../data/mock'
import { ease } from '../components/ui/motion'

const segs = [['Repeat buyers', 1120], ['High spenders', 640], ['Lapsed 60 days', 2310], ['Diwali openers', 5815], ['COD lovers', 1870], ['Metro shoppers', 3920]] as const

export default function SegmentsLocked() {
  const nav = useNavigate()
  const { trial, startTrial, complete, toast } = useDemo()

  const start = () => { startTrial(); complete('segments'); toast('Trial started (demo)', { tone: 'copilot' }) }

  return (
    <div className="relative">
      <div className={`transition duration-700 ${trial ? '' : 'pointer-events-none select-none blur-md'}`}>
        <PageHeader title="Customer segments" sub="Group contacts by behaviour and message them in one click." />
        <div className="grid grid-cols-3 gap-5">
          {segs.map(([n, c]) => (
            <Card key={n} className="p-5">
              <Users className="text-accent" size={20} />
              <div className="mt-3 font-semibold">{n}</div>
              <div className="tabular text-[24px] font-bold">{c.toLocaleString('en-IN')}</div>
              <div className="mt-3 flex -space-x-2">{['Ananya K', 'Rohit M', 'Sneha P', 'Meera N'].map((x) => <span key={x} className="rounded-full ring-2 ring-white"><Avatar name={x} size={26} /></span>)}</div>
            </Card>
          ))}
        </div>
      </div>

      {!trial && (
        <div className="absolute inset-0 flex items-start justify-center pt-16">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="glass w-full max-w-md rounded-modal border border-white/70 p-8 text-center shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
            <motion.span animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 1.2, delay: 0.8 }} className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600"><Lock /></motion.span>
            <Badge kind="pro" className="mt-4">Pro</Badge>
            <h2 className="mt-2 text-[24px] font-bold">Segments are on the Pro plan</h2>
            <p className="mt-2 text-muted">Your <b className="text-ink">{repeatBuyers.toLocaleString('en-IN')} repeat buyers</b> spend <b className="text-primary-600">3.2× more</b>. Message them first with a tailored offer.</p>
            <div className="mt-6 flex flex-col gap-2">
              <Button onClick={start} sparkle>Start 14-day free trial</Button>
              <Button variant="secondary" onClick={() => toast('Plans comparison is not part of this demo', { tone: 'info' })}>Compare plans</Button>
            </div>
          </motion.div>
        </div>
      )}
      {trial && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 rounded-xl bg-primary/10 p-4 font-medium text-primary-600">
          <Check size={18} /> Pro trial active — 14 days left. <Button variant="secondary" className="ml-auto h-8" onClick={() => nav('/home')}>Back to Home</Button>
        </motion.div>
      )}
    </div>
  )
}
