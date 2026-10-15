import { useOutlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { pageVariants } from '../ui/motion'

export default function AppShell() {
  const outlet = useOutlet()
  const { pathname } = useLocation()
  return (
    <div className="relative min-h-full">
      <Sidebar />
      <div className="relative ml-[248px] min-h-screen overflow-hidden">
        {/* ambient blobs */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full bg-primary/[0.07] blur-[120px]" />
        <TopBar />
        <AnimatePresence mode="wait">
          <motion.main key={pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="relative mx-auto max-w-[1280px] p-8">
            {outlet}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}
