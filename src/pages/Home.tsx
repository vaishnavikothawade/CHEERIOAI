import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Badge, Card, PageHeader, StatCard } from '../components/ui/Primitives'
import GrowthChecklist from '../components/checklist/GrowthChecklist'
import NudgeCard from '../components/copilot/NudgeCard'
import { useDemo } from '../context/DemoContext'
import { campaign, recentCampaigns, stats, user } from '../data/mock'
import { item } from '../components/ui/motion'

export default function Home() {
  const nav = useNavigate()
  const { botLive, snoozed } = useDemo()
  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <>
      <PageHeader title={<>{greet}, {user.first} <motion.span className="inline-block origin-[70%_70%]" animate={{ rotate: [0, 18, -8, 14, 0] }} transition={{ duration: 1.4, delay: 0.6 }}>👋</motion.span></>}
        sub={`Here's how ${user.company} is doing this week.`} />

      <div className="grid grid-cols-4 gap-5">
        {stats.map((s, i) => <StatCard key={s.id} {...s} delay={i * 120} />)}
      </div>

      <div className="mt-5 grid grid-cols-[1.35fr_1fr] items-start gap-5">
        <GrowthChecklist />
        <div className="space-y-5">
          {!botLive && (
            <NudgeCard id="home-waiting" title={`⚠️ ${campaign.waiting} customers are waiting for a reply from your ${campaign.name}`}
              body="Most are asking about price, COD and shipping — the kind of questions a chatbot answers in seconds."
              cta="See campaign report" onCta={() => nav('/campaigns/diwali-glow-sale')}
              why={`Because ${campaign.waiting} replies to this campaign are unanswered.`} delay={0.5} />
          )}
          {!botLive && snoozed.includes('home-waiting') && (
            <Card className="p-5 text-[13px] text-muted">Copilot will remind you in 7 days. The checklist item stays so you can set it up anytime.</Card>
          )}
          {botLive && (
            <Card className="grad-border p-6">
              <Badge kind="live">Glow Assistant is live</Badge>
              <h3 className="mt-3 text-[18px] font-bold">Your FAQ bot is replying 24/7</h3>
              <p className="mt-1 text-muted">Average reply time dropped from 6 hrs to 3 sec.</p>
            </Card>
          )}
        </div>
      </div>

      <Card hover={false} className="mt-5 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-3"><h2 className="text-[18px] font-bold">Recent campaigns</h2><span className="text-[13px] text-muted">3 campaigns</span></div>
        <table className="w-full text-left">
          <thead><tr className="border-y border-line bg-slate-50/70 text-[12px] font-semibold text-muted">
            {['Campaign', 'Status', 'Audience', 'Read rate', 'Replies', 'When', ''].map((h) => <th key={h} className="px-6 py-2.5">{h}</th>)}
          </tr></thead>
          <tbody>
            {recentCampaigns.map((c, i) => (
              <motion.tr key={c.name} variants={item} onClick={() => c.slug && nav(`/campaigns/${c.slug}`)}
                className={`group border-b border-line/70 last:border-0 transition-colors hover:bg-slate-50 ${c.slug ? 'cursor-pointer' : ''}`}>
                <td className="px-6 py-3.5 font-semibold">{c.name}</td>
                <td className="px-6"><Badge kind={c.status === 'Active' ? 'live' : 'green'}>{c.status}</Badge></td>
                <td className="tabular px-6">{c.audience.toLocaleString('en-IN')}</td>
                <td className="px-6"><div className="flex items-center gap-2"><div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100"><motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${c.read}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }} /></div><span className="tabular text-[13px]">{c.read}%</span></div></td>
                <td className="tabular px-6">{c.replies}</td>
                <td className="px-6 text-muted">{c.when}</td>
                <td className="px-6 text-right">{c.slug && <ArrowUpRight size={16} className="inline text-slate-300 transition group-hover:text-primary" />}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}
