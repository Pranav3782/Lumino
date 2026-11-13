import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/utils'

type ScrollHighlightProps = {
  text: string
  className?: string
}

export function ScrollHighlight({ text, className }: ScrollHighlightProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })

  const words = text.split(' ')

  return (
    <p ref={ref} className={cn('relative', className)}>
      {words.map((word, index) => {
        const start = (index / words.length) * 0.9
        const end = start + 0.14
        return <Word key={`${word}-${index}`} word={word} progress={scrollYProgress} start={start} end={end} reduce={!!reduce} />
      })}
    </p>
  )
}

function Word({
  word,
  progress,
  start,
  end,
  reduce,
}: {
  word: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
  reduce: boolean
}) {
  const color = useTransform(progress, [start, Math.min(end, 1)], ['#C9C9C9', '#171717'])
  return (
    <motion.span style={reduce ? undefined : { color }} className={reduce ? 'text-ink' : undefined}>
      {word}{' '}
    </motion.span>
  )
}
