import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../lib/utils'
import { useSmoothScroll } from '../lib/smooth-scroll'
import { MaskedLines, Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

const values = [
  {
    title: 'Clarity over cleverness',
    body: 'The idea should be obvious in hindsight. We remove until it is.',
  },
  {
    title: 'Craft is a habit',
    body: 'Details are how a brand earns trust. We sweat the small things.',
  },
  {
    title: 'Small team, big ownership',
    body: 'The people you meet in week one are the ones doing the work.',
  },
]

export function About() {
  const reduce = useReducedMotion()
  const { scrollTo } = useSmoothScroll()

  const float = reduce
    ? undefined
    : {
        y: [0, -10, 0],
        transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' as const },
      }

  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40">
      <div className="container-shell">
        <SectionLabel index="05">The company</SectionLabel>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <MaskedLines
              className="font-display text-[clamp(2rem,5.2vw,4.7rem)] font-medium leading-[1.02] tracking-[-0.045em]"
              lines={[
                'Independent',
                <>
                  by <span className="text-indigo">design.</span>
                </>,
              ]}
            />

            <div className="mt-8 max-w-xl space-y-4 text-[15px] leading-[1.75] text-mute">
              <Reveal delay={0.05}>
                <p>
                  Lumino Tech Solutions is a technology and design company.
                  We’re strategists, designers and engineers who’d rather make
                  fewer things, better.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  Since {site.founded} we’ve helped founders, cultural institutions and
                  product teams find a clearer voice — and the systems to keep it
                  long after we’ve gone.
                </p>
              </Reveal>
            </div>

            <ul className="mt-10 border-t border-line">
              {values.map((value, index) => (
                <li key={value.title} className="border-b border-line">
                  <Reveal delay={index * 0.06}>
                    <div className="group flex items-start justify-between gap-6 py-5">
                      <div className="flex gap-5 md:gap-8">
                        <span className="pt-1 text-[9px] font-medium uppercase tracking-[0.16em] text-mute">
                          0{index + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-orange-deep md:text-xl">
                            {value.title}
                          </h3>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-mute">
                            {value.body}
                          </p>
                        </div>
                      </div>
                      <span className="mt-1 h-px w-6 shrink-0 bg-line transition-all duration-500 group-hover:w-10 group-hover:bg-ink" />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <button
                type="button"
                onClick={() => scrollTo('#process', -84)}
                className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-ink"
                data-cursor="Process"
              >
                <span className="link-underline tap-target">See how we work</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12} y={34}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-line bg-[#ECE4D8] md:rounded-[28px]">
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(23,23,23,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.05) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                  }}
                />
                <motion.div
                  className="absolute -right-16 -top-20 h-[62%] w-[62%] rounded-full bg-orange"
                  animate={float}
                />
                <div className="absolute -right-6 top-14 h-[38%] w-[38%] rounded-full border border-ink/15" />

                <div className="absolute -bottom-[18%] -left-[14%] h-[64%] w-[86%] rounded-tr-[140px] bg-indigo" />
                <div className="absolute -bottom-[10%] -left-[4%] h-[40%] w-[54%] rounded-tr-[120px] bg-[#4F48E0]/70" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-ink/65 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                  The team
                </div>

                <div className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 -rotate-3 md:w-[72%]">
                  <motion.div
                    className="rounded-[20px] bg-[#FCFAF5] p-5 shadow-[0_30px_60px_-24px_rgba(23,23,23,.4)] md:p-7"
                    animate={
                      reduce
                        ? undefined
                        : {
                            y: [0, 6, 0],
                            transition: {
                              duration: 11,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                          }
                    }
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-ink/40">
                        Est. {site.founded}
                      </p>
                      <span className="h-2 w-2 rounded-full bg-indigo" />
                    </div>
                    <p className="mt-6 font-display text-[clamp(2.2rem,4.2vw,3.5rem)] font-medium leading-none tracking-[-0.06em]">
                      Lumino<span className="text-orange-deep">.</span>
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink/45">
                      Design-led technology
                    </p>
                    <div className="mt-6 border-t border-ink/10 pt-4 text-[9px] font-medium uppercase tracking-[0.14em] text-ink/55">
                      <span>5 disciplines</span>
                    </div>
                  </motion.div>
                </div>

                <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-white">
                  <span className="h-1 w-1 rounded-full bg-orange" />
                  Open for select projects
                </div>

                <div className="absolute -translate-y-1/2 right-4 top-1/2 rotate-90 text-[8px] font-medium uppercase tracking-[0.32em] text-white/55">
                  Design partners, not vendors
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <figure className="mt-16 grid gap-8 border-t border-line pt-10 md:mt-20 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-2">
            <span className="eyebrow">Kind words</span>
          </div>
          <blockquote className="md:col-span-7">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.22] tracking-[-0.03em]">
              “Lumino didn’t just redesign our brand. They gave us a way of thinking
              we still use every day.”
            </p>
          </blockquote>
          <figcaption className="text-[11px] leading-relaxed text-mute md:col-span-3 md:justify-self-end md:text-right">
            <span className="block font-medium text-ink">Anaïs Laurent</span>
            Founder, Lumen
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
