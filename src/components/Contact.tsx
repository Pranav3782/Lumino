import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../lib/utils'
import { Magnetic } from './ui/Magnetic'
import { MaskedLines } from './ui/Reveal'

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Behance', href: 'https://www.behance.net' },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section id="contact" className="relative pb-8 pt-4 md:pb-12">
      <div className="container-shell">
        <div className="relative isolate overflow-hidden rounded-[26px] bg-ink px-6 py-14 text-white sm:px-9 md:rounded-[34px] md:px-12 md:py-20 lg:px-16 lg:py-24">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
            style={{
              background:
                'radial-gradient(50% 60% at 12% 100%, rgba(255,101,53,0.55), transparent 70%), radial-gradient(40% 50% at 92% 4%, rgba(98,91,255,0.5), transparent 70%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage:
                'radial-gradient(70% 70% at 50% 40%, black, transparent 85%)',
            }}
          />
          <span
            className="pointer-events-none absolute -bottom-[9vw] right-[-2vw] -z-10 select-none font-display text-[30vw] font-medium leading-none tracking-[-0.07em] text-white/[0.035]"
            aria-hidden="true"
          >
            Lumino.
          </span>

          <div className="flex items-center gap-4 border-t border-white/15 pt-5">
            <span className="eyebrow text-white/55">06</span>
            <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
            <span className="eyebrow text-white/55">Contact</span>
          </div>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-8">
              <MaskedLines
                className="font-display text-[clamp(2rem,7vw,6.4rem)] font-medium leading-[0.98] tracking-[-0.05em]"
                lines={[
                  'Have something',
                  <>
                    great in <span className="text-orange">mind?</span>
                  </>,
                ]}
              />
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="max-w-sm text-[15px] leading-[1.7] text-white/55">
                Tell us what you’re building, what’s getting in the way, and what a
                good outcome looks like. We reply within two working days.
              </p>

              <div className="mt-7 flex flex-col items-start gap-4">
                <Magnetic strength={0.18}>
                  <a
                    href={`mailto:${site.email}?subject=New%20project%20enquiry`}
                    className="group inline-flex h-14 items-center gap-3 rounded-full bg-orange pl-7 pr-2.5 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-white focus-visible:ring-offset-0"
                    data-cursor="Email"
                  >
                    Start a project
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-orange-deep">
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.9}
                      />
                    </span>
                  </a>
                </Magnetic>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="group inline-flex items-center gap-2.5 text-[13px] text-white/60 transition-colors duration-300 hover:text-white"
                  data-cursor="Copy"
                >
                  <span className="link-underline tabular-nums">{site.email}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-white/40">
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="h-3.5 w-3.5 text-orange" strokeWidth={2} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Copy className="h-3 w-3" strokeWidth={1.75} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className="sr-only" aria-live="polite">
                    {copied ? 'Email address copied to clipboard' : ''}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-2 md:mt-16">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">
                New business
              </p>
              <a
                href={`mailto:${site.email}`}
                className="link-underline mt-2 inline-block py-1 text-[13px] text-white/75 hover:text-white"
              >
                {site.email}
              </a>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                Lumino Tech Solutions
              </p>
            </div>
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">
                Elsewhere
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline inline-flex items-center gap-1 py-1 text-[13px] text-white/75 hover:text-white"
                  >
                    {social.label}
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
              </span>
              Available for select projects — Q1 2027
            </div>

            <div className="relative hidden h-28 w-28 sm:block" aria-hidden="true">
              <svg viewBox="0 0 100 100" className={reduce ? 'h-full w-full' : 'spin-slow h-full w-full'}>
                <defs>
                  <path
                    id="contact-badge-path"
                    d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                  />
                </defs>
                <text
                  className="fill-white/40 text-[6.4px] font-medium uppercase"
                  style={{ letterSpacing: '0.16em' }}
                >
                  <textPath href="#contact-badge-path">
                    Let’s make something great — Let’s make something great —
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-orange">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

