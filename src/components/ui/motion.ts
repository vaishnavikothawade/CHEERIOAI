import { useEffect, useRef, useState } from 'react'
import type { Variants } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease, staggerChildren: 0.06 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}
export const item: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

/** Tween a number to `target`; starts from `from` on mount, then from the last shown value. */
export function useAnimatedNumber(target: number, duration = 1200, from = 0, delay = 0) {
  const [v, setV] = useState(from)
  const cur = useRef(from)
  useEffect(() => {
    const start = cur.current
    if (start === target) return
    let raf = 0
    let t0 = 0
    const timer = setTimeout(() => {
      const tick = (t: number) => {
        if (!t0) t0 = t
        const p = Math.min(1, (t - t0) / duration)
        const e = 1 - Math.pow(1 - p, 3)
        cur.current = start + (target - start) * e
        setV(Math.round(cur.current))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [target, duration, delay])
  return v
}

/** Typewriter text, ~18ms/char. */
export function useTypewriter(text: string, run: boolean, speed = 18) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    setN(0)
    const id = setInterval(() => setN((x) => (x >= text.length ? (clearInterval(id), x) : x + 1)), speed)
    return () => clearInterval(id)
  }, [text, run, speed])
  return run ? text.slice(0, n) : ''
}
