import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'

export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [hidden, setHidden] = useState(true)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let dotX = targetX
    let dotY = targetY
    let ringX = targetX
    let ringY = targetY
    let frame = 0

    const draw = () => {
      dotX += (targetX - dotX) * 0.42
      dotY += (targetY - dotY) * 0.42
      ringX += (targetX - ringX) * 0.16
      ringY += (targetY - ringY) * 0.16

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ringX + 18}px, ${ringY + 18}px, 0)`
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      setHidden(false)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      const el = target?.closest<HTMLElement>('[data-cursor], a, button')
      if (!el) {
        setLabel('')
        setHovering(false)
        return
      }
      setHovering(true)
      setLabel(el.getAttribute('data-cursor') ?? '')
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => {
      setHidden(true)
      setHovering(false)
      setLabel('')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none">
      <div
        ref={ringRef}
        className={cn(
          'fixed left-0 top-0 z-[90] transition-opacity duration-300',
          hidden && 'opacity-0',
        )}
      >
        <div
          className={cn(
            'rounded-full border border-white mix-blend-difference transition-all duration-300 ease-smooth',
            '-translate-x-1/2 -translate-y-1/2',
            hovering ? 'h-[58px] w-[58px]' : 'h-[30px] w-[30px]',
            pressed && 'scale-75',
          )}
        />
      </div>
      <div
        ref={dotRef}
        className={cn(
          'fixed left-0 top-0 z-[90] transition-opacity duration-300',
          hidden && 'opacity-0',
        )}
      >
        <div
          className={cn(
            'h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-transform duration-200',
            hovering && 'scale-0',
            pressed && 'scale-75',
          )}
        />
      </div>
      <div
        ref={labelRef}
        className={cn(
          'fixed left-0 top-0 z-[91] transition-opacity duration-200',
          label && !hidden ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className="inline-block whitespace-nowrap rounded-full bg-ink px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-white shadow-pill">
          {label}
        </span>
      </div>
    </div>
  )
}
