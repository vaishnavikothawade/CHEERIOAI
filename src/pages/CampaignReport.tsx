import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Check, ChevronRight, Clock } from 'lucide-react'
import { Avatar, Badge, Card, Modal, PageHeader } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import NudgeCard from '../components/copilot/NudgeCard'
import { Bubble } from '../components/phone/Phone'
import { useDemo } from '../context/DemoContext'
import { campaign, templates } from '../data/mock'
import { ease, item } from '../components/ui/motion'

export default function CampaignReport() {
  const [pick, setPick] = useState(false)
  const [sel, setSel] = useState('faq')
  const nav = useNavigate()
  const { botLive } = useDemo()
  const max = campaign.funnel[0].value

  return (
    <>
      <PageHeader
        title={<span className="flex items-center gap-3">{campaign.name}<Badge kind="green" className="!text-[12px]">Completed</Badge></span>}
        sub={<span className="flex items-center gap-1"><Link to="/home" className="hover:text-ink">Campaigns</Link><ChevronRight size={13} />{campaign.name}</span>} />

      <div className="grid grid-cols-[1fr_380px] items-start gap-5">
        <div className="space-y-5">
          <Card hover={false} className="p-6">
            <h2 className="text-[18px] font-bold">Delivery funnel</h2>
            <div className="mt-5 space-y-3.5">
              {campaign.funnel.map((f, i) => (
                <div key={f.name} className="flex items-center gap-4">
                  <span className="w-20 text-[13px] text-muted">{f.name}</span>
                  <div className="h-9 flex-1 overflow-hidden rounded-lg bg-slate-100">
                    <motion.div className="flex h-full items-center justify-end rounded-lg pr-3 text-[12px] font-semibold text-white"
                      style={{ background: `linear-gradient(90deg, ${f.color}cc, ${f.color})`, minWidth: 44 }}
                      initial={{ width: 0 }} animate={{ width: `${Math.max((f.value / max) * 100, 6)}%` }} transition={{ duration: 1, ease, delay: 0.3 + i * 0.12 }} />
                  </div>
                  <span className="tabular w-16 text-right text-[14px] font-semibold">{f.value.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card hover={false} className="grid grid-cols-[200px_1fr] items-center gap-6 p-6">
            <div className="relative h-[200px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={campaign.replyTypes} dataKey="value" innerRadius={64} outerRadius={92} paddingAngle={3} cornerRadius={5} stroke="none" animationDuration={1200}>
                    {campaign.replyTypes.map((r) => <Cell key={r.name} fill={r.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="tabular font-display text-[28px] font-bold">{campaign.replies}</span><span className="text-[11px] text-muted">replies</span></div>
            </div>
            <div>
              <h2 className="text-[18px] font-bold">What people asked</h2>
              <div className="mt-3 space-y-2">
                {campaign.replyTypes.map((r) => (
                  <div key={r.name} className="flex items-center gap-3 text-[13px]">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />{r.name}
                    <span className="tabular ml-auto font-semibold">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card hover={false} className="p-6">
            <div className="flex items-center justify-between"><h2 className="text-[18px] font-bold">Unanswered replies</h2>
              {!botLive && <Badge kind="warn"><Clock size={11} /> {campaign.waiting} waiting</Badge>}</div>
            <div className="mt-3 divide-y divide-line/70">
              {campaign.unanswered.map((u, i) => (
                <motion.div key={u.name} variants={item} className="flex items-center gap-3.5 py-3">
                  <Avatar name={u.name} />
                  <div className="min-w-0 flex-1"><div className="text-[13px] font-semibold">{u.name}</div><div className="truncate text-muted">{u.msg}</div></div>
                  {botLive ? <Badge kind="green"><Check size={11} /> Answered by bot</Badge> : <Badge kind="warn">Waiting {u.ago}</Badge>}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        <div className="sticky top-24">
          {botLive ? (
            <Card className="grad-border p-6"><Badge kind="live">Glow Assistant is live</Badge><p className="mt-3 text-muted">All waiting customers got an instant reply.</p></Card>
          ) : (
            <NudgeCard id="report-waiting" delay={0.8} title={`${campaign.waiting} customers are still waiting for a reply`}
              body="83% of these are common questions — price, COD, shipping. A FAQ bot can answer them instantly, 24/7. Brands like yours reply 9× faster with one."
              chips={['78 asked about price', '41 asked about COD']} cta="Set up FAQ bot — 2 min" onCta={() => setPick(true)}
              why={`Because ${campaign.waiting} replies to this campaign are unanswered.`} />
          )}
        </div>
      </div>

      <Modal open={pick} onClose={() => setPick(false)} width="max-w-4xl">
        <div className="p-8">
          <h2 className="text-[26px] font-bold">Pick a starting point</h2>
          <p className="mt-1 text-muted">Pre-built for D2C brands. Copilot will fill it with your store's details.</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {templates.map((t) => {
              const on = sel === t.id
              return (
                <motion.button key={t.id} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => setSel(t.id)}
                  className={`relative rounded-2xl bg-white p-4 text-left shadow-card transition ${on ? 'grad-border shadow-glow' : 'border border-line'}`}>
                  {on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"><Check size={14} strokeWidth={3} /></motion.span>}
                  <div className="space-y-1.5 rounded-xl bg-[#ECE5DD] p-3">
                    <Bubble m={{ id: 'a', from: 'me', text: t.chat[0], time: '' }} />
                    <Bubble m={{ id: 'b', from: 'bot', text: t.chat[1], time: '' }} />
                  </div>
                  <div className="mt-3 flex items-center gap-2 font-semibold">{t.name}{t.tag && <Badge kind="ai">{t.tag}</Badge>}</div>
                  <p className="mt-1 text-[13px] text-muted">{t.desc}</p>
                </motion.button>
              )
            })}
          </div>
          <div className="mt-7 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setPick(false)}>Cancel</Button>
            <Button onClick={() => nav('/chatbots/new')} sparkle>Use this template</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
