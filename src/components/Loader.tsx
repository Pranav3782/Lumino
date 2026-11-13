import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { site } from '../lib/utils'

const SESSION_KEY = 'lumino-intro-seen'
const LOADER_MS = 2000

export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      return !window.sessionStorage.getItem(SESSION_KEY)
    } catch {
      return true
    }
  })
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number | null>(null)
  const finishedRef = useRef(false)

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }

    if (startRef.current === null) startRef.current = performance.now()
    const startedAt = startRef.current

    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      setProgress(100)
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1')
      } catch {}
      onDone()
      setShow(false)
    }

    const remaining = Math.max(0, LOADER_MS - (performance.now() - startedAt))
    const timeout = window.setTimeout(finish, remaining)
    let frame = 0

    const tick = (now: number) => {
      if (finishedRef.current) return
      const elapsed = Math.max(0, now - startedAt)
      const next = Math.min(100, Math.round((elapsed / LOADER_MS) * 100))
      setProgress((current) => (current === next ? current : next))
      if (elapsed < LOADER_MS) frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)

    return () => {
      window.clearTimeout(timeout)
      window.cancelAnimationFrame(frame)
    }
  }, [show, onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#FAFAF8] p-6 sm:p-10"
          initial={reduce ? false : { y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-mute"
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <span>Independent technology studio</span>
            <span className="hidden sm:block">Est. {site.founded}</span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="font-display text-[clamp(3rem,9vw,6rem)] font-medium leading-none tracking-[-0.05em]">
              Lumino<span className="text-orange">.</span>
            </div>
            <div
              className="mt-8 h-px w-[160px] overflow-hidden bg-line sm:w-[220px]"
              role="progressbar"
              aria-label="Loading"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full w-full origin-left bg-ink"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-mute"
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
          >
            <span>Design-led technology</span>
            <span className="hidden tabular-nums sm:block">{progress}%</span>
          </motion.div>
          <span className="sr-only" aria-live="polite">
            {progress === 0 || progress === 25 || progress === 50 || progress === 75 || progress === 100
              ? `Loading — ${progress}%`
              : ''}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
