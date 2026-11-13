import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '../lib/smooth-scroll'
import { cn, navItems, site } from '../lib/utils'
import { Magnetic } from './ui/Magnetic'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const lastFocused = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { stop, start, scrollTo } = useSmoothScroll()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['about', 'services', 'work', 'contact']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement as HTMLElement | null
    stop()
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 420)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const menu = menuRef.current
      if (!menu) return

      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      start()
      lastFocused.current?.focus?.()
    }
  }, [open, start, stop])

  const go = (href: string) => {
    setOpen(false)
    window.setTimeout(() => scrollTo(href, -80), 60)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth',
          scrolled
            ? 'border-b border-line-soft bg-white/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-shell grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 md:h-[84px]">
          <a
            href="#top"
            className="group flex items-center gap-3 justify-self-start"
            aria-label={`${site.fullName} — back to top`}
            data-cursor="Top"
          >
            <span className="font-display text-[25px] font-medium leading-none tracking-[-0.045em]">
              Lumino<span className="text-orange transition-colors duration-300 group-hover:text-ink">.</span>
            </span>
            <span className="hidden max-w-[104px] text-[9px] font-medium uppercase leading-[1.6] tracking-[0.18em] text-mute sm:block">
              {site.tagline}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.replace('#', '')
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium tracking-[-0.01em] transition-colors duration-300',
                    isActive ? 'text-ink' : 'text-mute hover:text-ink',
                  )}
                >
                  <span
                    className={cn(
                      'h-1 w-1 rounded-full bg-orange transition-all duration-300',
                      isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                    )}
                    aria-hidden="true"
                  />
                  <span className="link-underline">{item.label}</span>
                </a>
              )
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-2.5">
            <Magnetic strength={0.18}>
              <a
                href="#contact"
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-orange px-4 text-[12px] font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white sm:px-5"
                data-cursor="Say hello"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ink transition-colors duration-300 group-hover:bg-orange" />
                Let&apos;s Talk
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </Magnetic>

            <button
              type="button"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/50 text-ink transition-colors duration-300 hover:border-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <span className="flex w-4 flex-col items-end gap-[5px]">
                <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-4" />
                <span className="h-px w-2.5 bg-current transition-all duration-300 group-hover:w-4" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-[#F7F7F5] md:hidden"
            initial={reduce ? { opacity: 0 } : { y: '-100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-shell flex h-[72px] shrink-0 items-center justify-between">
              <span className="font-display text-[25px] font-medium leading-none tracking-[-0.045em]">
                Lumino<span className="text-orange">.</span>
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-shell mt-8 flex flex-1 flex-col">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault()
                    go(item.href)
                  }}
                  className="group flex items-baseline justify-between border-b border-line py-4"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.18 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-[9px] font-medium tracking-[0.2em] text-mute">
                      0{index + 1}
                    </span>
                    <span className="font-display text-[clamp(2.2rem,10vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                      {item.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-mute transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                    strokeWidth={1.5}
                  />
                </motion.a>
              ))}

              <motion.div
                className="mt-auto pb-8 pt-10"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <div className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-mute">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-dot" />
                  Available for new projects
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline font-display text-[22px] tracking-[-0.02em]"
                >
                  {site.email}
                </a>
                <div className="mt-6 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.18em] text-mute">
                  <span>Lumino Tech Solutions</span>
                  <span>Est. {site.founded}</span>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
