import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState, type PointerEvent } from 'react'
import { cn } from '../lib/utils'
import { services } from './services-data'
import { ServicePreview } from './ServicePreview'
import { MaskedLines, Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function Services() {
  const [active, setActive] = useState<number | null>(null)
  const [finePointer, setFinePointer] = useState(false)
  const [placeAbove, setPlaceAbove] = useState(true)

  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const springX = useSpring(x, { stiffness: 280, damping: 30, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 280, damping: 30, mass: 0.4 })

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFinePointer(media.matches)
    const onChange = (event: MediaQueryListEvent) => setFinePointer(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const handleMove = (event: PointerEvent<HTMLUListElement>) => {
    const halfCard = 160 + 20
    const clampedX = Math.min(
      Math.max(event.clientX, halfCard),
      window.innerWidth - halfCard,
    )
    x.set(clampedX)
    y.set(event.clientY)
    setPlaceAbove(event.clientY > 300)
  }

  return (
    <section id="services" className="relative pb-24 pt-8 md:pb-32 lg:pb-40">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel index="02">Services</SectionLabel>
            <MaskedLines
              className="mt-10 font-display text-[clamp(2rem,5.2vw,4.7rem)] font-medium leading-[1.02] tracking-[-0.045em]"
              lines={[
                'Capability,',
                <>
                  without the <span className="text-indigo">noise.</span>
                </>,
              ]}
            />
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[15px] leading-[1.7] text-mute">
                Five disciplines, one senior team. From UI/UX design and custom
                website development to branding, SEO and digital growth, we plug in
                where you need us — from the first idea to the last line of code.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href="#contact"
                className="group mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-ink"
                data-cursor="Talk"
              >
                <span className="link-underline tap-target">Start a conversation</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </Reveal>
          </div>
        </div>

        <ul
          className="mt-14 border-t border-line lg:mt-20"
          onPointerMove={handleMove}
          onPointerLeave={() => setActive(null)}
        >
          {services.map((service, index) => (
            <li key={service.title} className="border-b border-line">
              <div
                className="group relative -mx-4 grid cursor-default grid-cols-[24px_1fr_auto] items-start gap-4 rounded-sm px-4 py-7 transition-colors duration-500 hover:bg-mist md:-mx-6 md:grid-cols-[64px_1.15fr_1fr_56px] md:items-center md:gap-6 md:px-6 md:py-9 lg:py-10"
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
              >
                <span
                  className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-orange transition-transform duration-500 ease-smooth group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <span className="pt-1.5 text-[10px] font-medium tracking-[0.16em] text-mute md:pt-0 md:text-[11px]">
                  {service.index}
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-[clamp(1.55rem,3.4vw,2.9rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-transform duration-500 ease-smooth md:group-hover:translate-x-1.5">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-mute md:hidden">
                    {service.description}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5 md:hidden">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-white px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-ink/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block">
                  <p className="max-w-[320px] text-[13px] leading-[1.65] text-mute">
                    {service.description}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-ink/55 transition-colors duration-300 group-hover:border-ink/20 group-hover:text-ink/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center justify-self-end rounded-full border border-line text-ink transition-all duration-500 ease-smooth md:h-11 md:w-11',
                    'group-hover:border-ink group-hover:bg-ink group-hover:text-white',
                  )}
                  aria-hidden="true"
                >
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[13px] text-mute sm:flex-row sm:items-center">
          <p>Not sure where to start? We’ll help you find the right shape.</p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-medium text-ink"
            data-cursor="Talk"
          >
            <span className="link-underline tap-target">Book a 20-minute intro call</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>

      {finePointer && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
          style={{ x: springX, y: springY }}
          aria-hidden="true"
        >
          <div
            className={cn(
              'relative -translate-x-1/2',
              placeAbove ? '-translate-y-[calc(100%+20px)]' : 'translate-y-5',
            )}
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key={services[active].title}
                  initial={{ opacity: 0, scale: 0.9, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ServicePreview
                    kind={services[active].kind}
                    title={services[active].title}
                    index={services[active].index}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </section>
  )
}
