import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  duration?: number
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 0.9,
}: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

type MaskedLinesProps = {
  lines: ReactNode[]
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'div'
}

function MaskedLine({
  children,
  index,
  delay,
  stagger,
  reduce,
}: {
  children: ReactNode
  index: number
  delay: number
  stagger: number
  reduce: boolean | null
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -8% 0px' })

  return (
    <span ref={ref} className="mask-line">
      <motion.span
        className="block will-change-transform"
        initial={reduce ? false : { y: '140%' }}
        animate={reduce || inView ? { y: '0%' } : { y: '140%' }}
        transition={{
          duration: 1.05,
          delay: delay + index * stagger,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function MaskedLines({
  lines,
  className,
  delay = 0,
  stagger = 0.09,
  as: Tag = 'h2',
}: MaskedLinesProps) {
  const reduce = useReducedMotion()

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <MaskedLine
          key={index}
          index={index}
          delay={delay}
          stagger={stagger}
          reduce={reduce}
        >
          {line}
        </MaskedLine>
      ))}
    </Tag>
  )
}
