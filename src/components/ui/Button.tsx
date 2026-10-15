import { motion, type HTMLMotionProps } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type Props = HTMLMotionProps<'button'> & { variant?: 'primary' | 'secondary' | 'ghost' | 'copilot'; sparkle?: boolean }

export function Button({ variant = 'primary', sparkle, className = '', children, ...p }: Props) {
  if (variant === 'copilot')
    return (
      <motion.button whileTap={{ scale: 0.97 }} whileHover={{ y: -1 }}
        className={`btn grad-border bg-white !overflow-visible ${className}`} {...p}>
        <Sparkles size={15} className="text-accent animate-twinkle" />
        <span className="text-copilot">{children as React.ReactNode}</span>
      </motion.button>
    )
  return (
    <motion.button whileTap={{ scale: 0.97 }} whileHover={{ y: variant === 'primary' ? -1 : 0 }}
      className={`btn btn-${variant} ${className}`} {...p}>
      {sparkle && <Sparkles size={15} />}
      {children as React.ReactNode}
    </motion.button>
  )
}
