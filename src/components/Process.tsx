import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { MaskedLines } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

const steps = [
  {
    index: '01',
    title: 'Discover',
    duration: 'Week 1–2',
    description:
      'Stakeholder interviews, audits and an honest read on the problem — before a single pixel.',
  },
  {
    index: '02',
    title: 'Define',
    duration: 'Week 2–4',
    description:
      'Positioning, strategy and one creative direction we can all stand behind. Not three safe options.',
  },
  {
    index: '03',
    title: 'Design',
    duration: 'Week 4–8',
    description:
      'Identity, interface and motion designed as one system, then tested with real people.',
  },
  {
    index: '04',
    title: 'Deliver',
    duration: 'Week 8–12',
    description:
      'Build, launch and handover. Documentation and systems your team will actually use.',
  },
]

export function Process() {
  return (
    <section id="process" className="relative bg-mist py-20 md:py-28 lg:py-32">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <SectionLabel index="04">Process</SectionLabel>
            <MaskedLines
              className="mt-10 font-display text-[clamp(2rem,5.2vw,4.7rem)] font-medium leading-[1.02] tracking-[-0.045em]"
              lines={[
                'Calm process.',
                <>
                  Serious <span className="text-indigo">output.</span>
                </>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[15px] leading-[1.7] text-mute">
                No black boxes, no big reveals. A clear weekly rhythm, one senior
                team, and decisions you can follow from day one.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/60">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                Typical engagement: 6–12 weeks
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group relative flex flex-col bg-mist p-6 transition-colors duration-500 hover:bg-white md:p-8"
            >
              <Reveal delay={index * 0.06}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[1.6rem] font-medium leading-none tracking-[-0.04em] text-ink/25 transition-colors duration-500 group-hover:text-orange-deep">
                    {step.index}
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-mute">
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium tracking-[-0.035em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-mute">
                  {step.description}
                </p>
                <span className="mt-8 flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/40 transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
                </span>
              </Reveal>
              <span
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-orange transition-transform duration-700 ease-smooth group-hover:scale-x-100"
                aria-hidden="true"
              />
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 text-[13px] text-mute sm:flex-row sm:items-center">
          <p>One senior team end-to-end. No hand-offs to people you haven’t met.</p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-medium text-ink"
            data-cursor="Talk"
          >
            <span className="link-underline tap-target">Tell us about your timeline</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </section>
  )
}
