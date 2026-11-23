import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'

export type Word = {
  text: string
  accent: string
  label: string
  pill: string
}

export type WordStage = 'idle' | 'exit' | 'enter' | 'highlight' | 'circle' | 'settle'

export type WordCycleState = {
  word: Word
  index: number
  stage: WordStage
  reduce: boolean | null
  highlightProgress: number
  circleProgress: number
  suryaProgress: number
  lumenProgress: number
}

export type WordMetrics = {
  left: number
  right: number
  width: number
  top: number
  bottom: number
  fontSize: number
}

const WORDS: Word[] = [
  { text: 'design', accent: '#625BFF', label: 'UI/UX', pill: 'bg-indigo text-white' },
  { text: 'branding', accent: '#CC4210', label: 'Identity', pill: 'bg-orange text-ink' },
  {
    text: 'development',
    accent: '#625BFF',
    label: 'Build',
    pill: 'bg-indigo text-white',
  },
  { text: 'strategy', accent: '#CC4210', label: 'Direction', pill: 'bg-orange text-ink' },
  {
    text: 'experience',
    accent: '#625BFF',
    label: 'Digital',
    pill: 'bg-indigo text-white',
  },
]

const CYCLE_MS = 3600
const INTRO_DELAY_MS = 400
const EXIT_MS = 450
const HIGHLIGHT_START_MS = 1000
const HIGHLIGHT_END_MS = 1620
const CIRCLE_START_MS = 1650
const CIRCLE_END_MS = 2650
const SURYA_APPROACH_START_MS = 800
const LUMEN_APPROACH_START_MS = 1180
const EASE = [0.22, 1, 0.36, 1] as const

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function progressAt(value: number, start: number, end: number) {
  return clamp01((value - start) / (end - start))
}

function roundProgress(value: number) {
  return Math.round(clamp01(value) * 10000) / 10000
}

function withAlpha(hex: string, alpha: number) {
  const value = hex.replace('#', '')
  const r = Number.parseInt(value.slice(0, 2), 16)
  const g = Number.parseInt(value.slice(2, 4), 16)
  const b = Number.parseInt(value.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const IDLE_PROGRESS = {
  highlightProgress: 0,
  circleProgress: 0,
  suryaProgress: 0,
  lumenProgress: 0,
}

function stageAt(elapsed: number, firstCycle: boolean): WordStage {
  if (elapsed < EXIT_MS) return firstCycle ? 'enter' : 'exit'
  if (elapsed < HIGHLIGHT_START_MS) return 'enter'
  if (elapsed < CIRCLE_START_MS) return 'highlight'
  if (elapsed < CIRCLE_END_MS) return 'circle'
  return 'settle'
}

export function useWordCycle(ready: boolean): WordCycleState {
  const reduce = useReducedMotion()
  const [frame, setFrame] = useState<{ index: number; stage: WordStage } & typeof IDLE_PROGRESS>({
    index: 0,
    stage: 'idle',
    ...IDLE_PROGRESS,
  })

  useEffect(() => {
    if (!ready || reduce) {
      setFrame({ index: 0, stage: 'idle', ...IDLE_PROGRESS })
      return
    }

    let frameId = 0
    let startedAt = 0

    const update = (now: number) => {
      if (!startedAt) startedAt = now
      const total = Math.max(0, now - startedAt - INTRO_DELAY_MS)
      const cycle = Math.floor(total / CYCLE_MS)
      const elapsed = total - cycle * CYCLE_MS
      const stage = stageAt(elapsed, cycle === 0)

      const highlightProgress = roundProgress(
        progressAt(elapsed, HIGHLIGHT_START_MS, HIGHLIGHT_END_MS),
      )
      const circleProgress = roundProgress(
        progressAt(elapsed, CIRCLE_START_MS, CIRCLE_END_MS),
      )
      const suryaProgress = roundProgress(
        progressAt(elapsed, SURYA_APPROACH_START_MS, HIGHLIGHT_START_MS),
      )
      const lumenProgress = roundProgress(
        progressAt(elapsed, LUMEN_APPROACH_START_MS, CIRCLE_START_MS),
      )

      setFrame((current) => {
        const next = {
          index: cycle % WORDS.length,
          stage,
          highlightProgress,
          circleProgress,
          suryaProgress,
          lumenProgress,
        }

        if (
          current.index === next.index &&
          current.stage === next.stage &&
          current.highlightProgress === next.highlightProgress &&
          current.circleProgress === next.circleProgress &&
          current.suryaProgress === next.suryaProgress &&
          current.lumenProgress === next.lumenProgress
        ) {
          return current
        }

        return next
      })

      frameId = window.requestAnimationFrame(update)
    }

    frameId = window.requestAnimationFrame(update)
    return () => window.cancelAnimationFrame(frameId)
  }, [ready, reduce])

  return {
    word: WORDS[frame.index],
    index: frame.index,
    stage: frame.stage,
    reduce,
    highlightProgress: frame.highlightProgress,
    circleProgress: frame.circleProgress,
    suryaProgress: frame.suryaProgress,
    lumenProgress: frame.lumenProgress,
  }
}

export function WordCycler({
  state,
  ready,
  onMetrics,
  className,
}: {
  state: WordCycleState
  ready: boolean
  onMetrics?: (metrics: WordMetrics) => void
  className?: string
}) {
  const { word, stage, reduce, highlightProgress } = state
  const rootRef = useRef<HTMLSpanElement>(null)
  const baselineRef = useRef<HTMLSpanElement>(null)
  const onMetricsRef = useRef(onMetrics)
  const measureRef = useRef<() => void>(() => {})
  const highlighted = highlightProgress > 0 && stage !== 'exit' && stage !== 'idle'

  useEffect(() => {
    onMetricsRef.current = onMetrics
  }, [onMetrics])

  const measure = useCallback(() => {
    if (!ready) return

    const root = rootRef.current
    const hidden = root?.querySelector<HTMLElement>(`[data-word="${word.text}"]`)
    if (!root || !hidden) return

    const rootRect = root.getBoundingClientRect()
    const range = document.createRange()
    range.selectNodeContents(hidden)
    const textRect = range.getBoundingClientRect()
    const style = getComputedStyle(root)
    const fontSize = Number.parseFloat(style.fontSize)
    let top = rootRect.top
    let bottom = rootRect.bottom

    const baseline = baselineRef.current?.getBoundingClientRect().bottom
    const context = document.createElement('canvas').getContext('2d')
    if (baseline !== undefined && context) {
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      const text = context.measureText(word.text)
      if (
        Number.isFinite(text.actualBoundingBoxAscent) &&
        Number.isFinite(text.actualBoundingBoxDescent)
      ) {
        top = baseline - text.actualBoundingBoxAscent
        bottom = baseline + text.actualBoundingBoxDescent
      }
    }

    onMetricsRef.current?.({
      left: textRect.left,
      right: textRect.right,
      width: textRect.width,
      top,
      bottom,
      fontSize,
    })
  }, [ready, word.text])

  useEffect(() => {
    measureRef.current = measure
  }, [measure])

  useLayoutEffect(() => {
    measure()
    const frame = window.requestAnimationFrame(measure)
    return () => window.cancelAnimationFrame(frame)
  }, [measure, reduce])

  useEffect(() => {
    if (!ready) return
    let frame = 0
    const stopAt = performance.now() + 1700

    const trackEntrance = () => {
      measureRef.current()
      if (performance.now() < stopAt) {
        frame = window.requestAnimationFrame(trackEntrance)
      }
    }

    frame = window.requestAnimationFrame(trackEntrance)
    return () => window.cancelAnimationFrame(frame)
  }, [ready])

  useEffect(() => {
    if (!rootRef.current) return
    const observer = new ResizeObserver(measure)
    observer.observe(rootRef.current)
    void document.fonts.ready.then(measure)
    const handleResize = () => measure()
    window.addEventListener('resize', handleResize)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [measure])

  useEffect(() => {
    if (!onMetrics) return
    const timers = [0, 300, 700, 1100, 1600, 2200].map((delay) =>
      window.setTimeout(measure, delay),
    )
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [measure, onMetrics])

  return (
    <span
      ref={rootRef}
      data-cycle-stage={stage}
      data-word-current={word.text}
      data-highlight-progress={highlightProgress.toFixed(4)}
      className={cn('relative inline-grid whitespace-nowrap align-baseline', className)}
    >
      {WORDS.map((item) => (
        <span
          key={item.text}
          data-word={item.text}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 w-max whitespace-nowrap"
        >
          {item.text}
        </span>
      ))}

      {reduce ? (
        <span className="col-start-1 row-start-1 whitespace-nowrap text-left text-ink">
          design
          <span ref={baselineRef} aria-hidden="true" className="inline-block h-0 w-0 align-baseline" />
        </span>
      ) : (
        <span className="pointer-events-none absolute -bottom-[0.28em] -left-[0.22em] -right-[1.2em] -top-[0.16em] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={word.text}
              className="absolute inset-0 block whitespace-nowrap pb-[0.28em] pl-[0.22em] pt-[0.16em] text-left will-change-transform"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{
                y: '-100%',
                opacity: 0,
                transition: {
                  y: { duration: 0.45, ease: EASE },
                  opacity: { duration: 0.3, ease: 'easeOut' },
                },
              }}
              transition={{
                y: { duration: 0.55, ease: EASE },
                opacity: { duration: 0.35, ease: 'easeOut' },
              }}
            >
              <span className="relative z-10 inline-block">
                {highlighted && (
                  <span
                    aria-hidden="true"
                    data-highlight-layer="true"
                    className="absolute -bottom-[0.08em] -top-[0.04em] origin-left rounded-[0.14em] will-change-transform"
                    style={{
                      left: 'calc(0px - clamp(3px, 0.1em, 5px))',
                      right: 'calc(0px - clamp(3px, 0.1em, 5px))',
                      backgroundColor: withAlpha(word.accent, 0.14),
                      transform: `scaleX(${highlightProgress})`,
                    }}
                  />
                )}

                <span className="relative z-10">
                  {word.text}
                  <span ref={baselineRef} aria-hidden="true" className="inline-block h-0 w-0 align-baseline" />
                </span>
              </span>

              <span
                aria-hidden="true"
                className={cn(
                  'ml-[0.3em] hidden rotate-3 items-center gap-1.5 rounded-full px-2.5 py-1 align-middle text-[9px] font-medium uppercase tracking-[0.16em] shadow-pill xl:inline-flex',
                  word.pill,
                )}
              >
                <span className="h-1 w-1 rounded-full bg-current opacity-70" />
                {word.label}
              </span>
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </span>
  )
}
