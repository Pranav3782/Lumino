import Lenis from 'lenis'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { prefersReducedMotion } from './utils'

type SmoothScrollContextValue = {
  lenis: Lenis | null
  scrollTo: (target: string | HTMLElement, offset?: number) => void
  stop: () => void
  start: () => void
  scrollY: number
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

const NAV_OFFSET = 84

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      const onScroll = () => setScrollY(window.scrollY)
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      smoothWheel: true,
      syncTouch: false,
    })
    lenisRef.current = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onScroll = ({ scroll }: { scroll: number }) => setScrollY(scroll)
    lenis.on('scroll', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback((target: string | HTMLElement, offset = 0) => {
    const el =
      typeof target === 'string'
        ? (document.querySelector(target) as HTMLElement | null)
        : target
    if (!el) return

    const prefersReduced = prefersReducedMotion()
    const y =
      typeof target === 'string' && target === '#top'
        ? 0
        : el.getBoundingClientRect().top + window.scrollY + offset

    if (lenisRef.current && !prefersReduced) {
      if (target === '#top') {
        lenisRef.current.scrollTo(0)
      } else {
        lenisRef.current.scrollTo(el, { offset })
      }
    } else {
      window.scrollTo({
        top: y,
        behavior: prefersReduced ? 'auto' : 'smooth',
      })
    }
  }, [])

  const stop = useCallback(() => lenisRef.current?.stop(), [])
  const start = useCallback(() => lenisRef.current?.start(), [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      )
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector(href)
      if (!el) return
      event.preventDefault()
      scrollTo(href, -NAV_OFFSET)
      window.history.replaceState(null, '', href)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [scrollTo])

  const value = useMemo(
    () => ({ lenis: lenisRef.current, scrollTo, stop, start, scrollY }),
    [scrollTo, stop, start, scrollY],
  )

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) {
    throw new Error('useSmoothScroll must be used inside SmoothScrollProvider')
  }
  return ctx
}
