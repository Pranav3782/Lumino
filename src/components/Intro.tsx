import { ArrowUpRight } from 'lucide-react'
import { MaskedLines, Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function Intro() {
  return (
    <section id="studio" className="relative py-24 md:py-32 lg:py-40">
      <div className="container-shell">
        <SectionLabel index="01">Company</SectionLabel>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <MaskedLines
              className="font-display text-[clamp(2rem,5.2vw,4.7rem)] font-medium leading-[1.02] tracking-[-0.045em]"
              lines={[
                'Great design isn’t',
                'decoration. It’s how a',
                <>
                  business <span className="text-orange-deep">thinks.</span>
                </>,
              ]}
            />
          </div>

          <div className="flex flex-col justify-end lg:col-span-4 lg:pl-6">
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[15px] leading-[1.7] text-mute">
                Lumino is a design-led technology company for ambitious businesses.
                We partner with founders and teams to shape brands, websites, custom
                web applications and digital products with clarity, character and a
                little edge.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href="#about"
                className="group mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-ink"
                data-cursor="Studio"
              >
                <span className="link-underline tap-target">More about the company</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-mute">
                <span className="h-px w-8 bg-line" />
                Small by design, senior by default
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  )
}
