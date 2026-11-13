import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { HeroAnnotations, type HeroAnnotationLayout } from './HeroAnnotations'
import { InlineVisual } from './InlineVisual'
import { Marquee } from './ui/Marquee'
import { WordCycler, useWordCycle, type WordMetrics } from './WordCycler'

const SERVICES = [
  'UI/UX Design',
  'Website Development',
  'Branding & Identity',
  'Digital Marketing',
  'SEO & Growth',
]

const EASE = [0.16, 1, 0.3, 1] as const

function nearlyEqual(a: HeroAnnotationLayout, b: HeroAnnotationLayout) {
  return (
    Math.abs(a.wordLeft - b.wordLeft) < 0.5 &&
    Math.abs(a.wordRight - b.wordRight) < 0.5 &&
    Math.abs(a.wordWidth - b.wordWidth) < 0.5 &&
    Math.abs(a.wordHeight - b.wordHeight) < 0.5 &&
    Math.abs(a.wordCenterY - b.wordCenterY) < 0.5 &&
    Math.abs(a.greatLeft - b.greatLeft) < 0.5 &&
    Math.abs(a.sectionWidth - b.sectionWidth) < 0.5 &&
    Math.abs(a.fontSize - b.fontSize) < 0.5
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const wordState = useWordCycle(ready)
  const sectionRef = useRef<HTMLElement>(null)
  const greatRef = useRef<HTMLSpanElement>(null)
  const [annotationLayout, setAnnotationLayout] = useState<HeroAnnotationLayout | null>(null)

  const line = (index: number) => ({
    initial: reduce ? false : { y: '140%' },
    animate: ready ? { y: '0%' } : { y: '140%' },
    transition: {
      duration: 1.1,
      delay: 0.08 + index * 0.085,
      ease: EASE,
    },
  })

  const handleWordMetrics = useCallback((metrics: WordMetrics) => {
    const section = sectionRef.current
    const great = greatRef.current
    if (!section || !great) return

    const sectionRect = section.getBoundingClientRect()
    const greatRect = great.getBoundingClientRect()
    const next: HeroAnnotationLayout = {
      wordLeft: metrics.left - sectionRect.left,
      wordRight: metrics.right - sectionRect.left,
      wordWidth: metrics.width,
      wordHeight: metrics.bottom - metrics.top,
      wordCenterY: (metrics.top + metrics.bottom) / 2 - sectionRect.top,
      greatLeft: greatRect.left - sectionRect.left,
      sectionWidth: sectionRect.width,
      fontSize: metrics.fontSize,
    }

    setAnnotationLayout((current) =>
      current && nearlyEqual(current, next) ? current : next,
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[72px] md:pt-[84px]"
    >
      <HeroAnnotations state={wordState} layout={annotationLayout} />

      <div className="container-shell relative z-10 flex flex-1 flex-col justify-center pb-14 pt-10 sm:pb-16 sm:pt-12">
        <div className="mx-auto w-full max-w-[1260px]">
          <motion.div
            className="mb-8 hidden items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-mute sm:flex md:mb-10"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-dot" />
              Available for new projects
            </span>
            <span className="hidden lg:block">Independent technology studio — Est. 2026</span>
          </motion.div>

          <h1
            aria-label="Lumino Tech Solutions — a great business is the result of great design, branding and development."
            className="text-center font-display text-[clamp(2.2rem,8.3vw,7.9rem)] font-medium leading-[0.99] tracking-[-0.05em] min-[360px]:text-[clamp(2.35rem,8.3vw,7.9rem)]"
          >
            <span className="hero-line">
              <motion.span className="block whitespace-nowrap" {...line(0)}>
                A great business
              </motion.span>
            </span>
            <span className="hero-line">
              <motion.span className="block whitespace-nowrap" {...line(1)}>
                is the <InlineVisual /> result of
              </motion.span>
            </span>
            <span className="hero-line">
              <motion.span
                className="flex items-baseline justify-center whitespace-nowrap"
                {...line(2)}
              >
                <span ref={greatRef}>great</span>
                <WordCycler
                  state={wordState}
                  onMetrics={handleWordMetrics}
                  className="ml-3.5 md:ml-6"
                />
              </motion.span>
            </span>
          </h1>

          <motion.div
            className="mt-9 flex flex-col items-center gap-6 sm:mt-11"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <motion.a
                href="#contact"
                className="group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full bg-ink pl-6 pr-2.5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-orange hover:text-ink"
                data-cursor="Start"
                whileHover={reduce ? undefined : { y: -2, scale: 1.015 }}
                whileTap={reduce ? undefined : { scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={reduce ? undefined : { x: ['0%', '460%'] }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    ease: 'easeInOut',
                  }}
                />
                <span className="relative z-10">Start a project</span>
                <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/12 transition-colors duration-300 group-hover:bg-ink/10">
                  <motion.span
                    animate={reduce ? undefined : { rotate: [0, 5, 0, -4, 0] }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </motion.span>
                </span>
              </motion.a>
              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white/50 px-5 text-[13px] font-medium text-ink transition-colors duration-300 hover:border-ink sm:px-6"
                data-cursor="Explore"
              >
                Selected work
                <ArrowDown
                  className="h-3.5 w-3.5 text-mute transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-ink"
                  strokeWidth={2}
                />
              </a>
            </div>

            <div className="flex flex-col items-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-mute sm:flex-row sm:gap-5">
              <span className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
                </span>
                Booking Q1 2027
              </span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span className="flex items-center gap-2">
                Scroll to explore
                <ArrowDown className="h-3 w-3 animate-bounce text-ink/50" strokeWidth={1.75} />
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 mt-auto border-t border-line-soft bg-white/60"
        initial={reduce ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1, ease: EASE }}
      >
        <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-mute md:flex">
          <span className="h-1 w-1 rounded-full bg-indigo" />
          Design partners, not vendors
        </div>
        <Marquee items={SERVICES} speed={38} className="py-4 md:py-5" />
      </motion.div>
    </section>
  )
}
