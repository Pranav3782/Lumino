import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className, strength = 0.22 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 180, damping: 16, mass: 0.25 })
  const y = useSpring(0, { stiffness: 180, damping: 16, mass: 0.25 })

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}
