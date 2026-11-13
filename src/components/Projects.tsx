import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '../lib/smooth-scroll'
import { cn } from '../lib/utils'
import { ProjectDialog } from './ProjectDialog'
import { ProjectVisual } from './ProjectVisual'
import { projects, type Project } from './projects-data'
import { MaskedLines, Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

type ProjectCardProps = {
  project: Project
  index: number
  feature?: boolean
  className?: string
  onOpen: (trigger: HTMLElement) => void
}

function ProjectCard({
  project,
  index,
  feature = false,
  className,
  onOpen,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-3.5%', '3.5%'])

  return (
    <a
      ref={cardRef}
      href="#work"
      aria-haspopup="dialog"
      aria-label={`${project.name} — ${project.category}. Open case study.`}
      data-cursor="View"
      onClick={(event) => {
        event.preventDefault()
        onOpen(event.currentTarget)
      }}
      className={cn('group block focus-visible:outline-none', className)}
    >
      <div className="relative overflow-hidden rounded-[20px] border border-line bg-mist md:rounded-[26px]">
        <div
          className={cn(
            'visual-container relative w-full overflow-hidden',
            feature ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/3]',
          )}
        >
          <motion.div
            className="absolute -inset-[5%]"
            style={reduce ? undefined : { y }}
          >
            <div className="h-full w-full transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.025]">
              <ProjectVisual kind={project.kind} />
            </div>
          </motion.div>

          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-ink/70 backdrop-blur md:left-4 md:top-4 md:text-[10px]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-ink/20 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur md:right-4 md:top-4 md:text-[10px]">
            {project.year}
          </span>

          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/[0.06]"
            aria-hidden="true"
          >
            <span className="translate-y-3 rounded-full bg-white px-4 py-2.5 text-[11px] font-medium tracking-[0.02em] text-ink opacity-0 shadow-[0_10px_30px_-8px_rgba(0,0,0,.4)] transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
              View case study ↗
            </span>
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-6 md:mt-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
            <h3
              className={cn(
                'font-display font-medium tracking-[-0.04em]',
                feature
                  ? 'text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.02]'
                  : 'text-[clamp(1.45rem,2.4vw,2rem)] leading-[1.05]',
              )}
            >
              {project.name}
            </h3>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-mute md:text-[11px]">
              {project.category}
            </span>
          </div>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-mute md:text-sm">
            {project.description}
          </p>
        </div>

        <span className="hidden shrink-0 items-center gap-2 pt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-ink sm:flex">
          <span className="link-underline">View</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </a>
  )
}

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const { stop, start } = useSmoothScroll()

  const isOpen = openIndex !== null
  const activeProject = openIndex !== null ? projects[openIndex] : null
  const nextProject =
    openIndex !== null ? projects[(openIndex + 1) % projects.length] : null

  const openProject = (index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setOpenIndex(index)
  }

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    stop()

    return () => {
      document.body.style.overflow = previousOverflow
      start()
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [isOpen, stop, start])

  return (
    <section id="work" className="relative pb-24 pt-4 md:pb-32 lg:pb-40">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <SectionLabel index="03">Selected work</SectionLabel>
            <MaskedLines
              className="mt-10 font-display text-[clamp(2rem,5.2vw,4.7rem)] font-medium leading-[1.02] tracking-[-0.045em]"
              lines={[
                'Selected work,',
                <>
                  made to <span className="text-orange-deep">matter.</span>
                </>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[15px] leading-[1.7] text-mute">
                A small selection of recent partnerships — identity, product and
                commerce work built to last longer than a launch cycle.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href="#contact"
                className="group mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-ink"
                data-cursor="Talk"
              >
                <span className="link-underline tap-target">Have a project in mind?</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-x-6 md:gap-y-16">
          <ProjectCard
            project={projects[0]}
            index={0}
            feature
            className="md:col-span-12"
            onOpen={(trigger) => openProject(0, trigger)}
          />
          <ProjectCard
            project={projects[1]}
            index={1}
            className="md:col-span-7"
            onOpen={(trigger) => openProject(1, trigger)}
          />
          <ProjectCard
            project={projects[2]}
            index={2}
            className="md:col-span-5 md:mt-20"
            onOpen={(trigger) => openProject(2, trigger)}
          />
          <ProjectCard
            project={projects[3]}
            index={3}
            feature
            className="md:col-span-12"
            onOpen={(trigger) => openProject(3, trigger)}
          />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-[13px] text-mute sm:flex-row sm:items-center md:mt-16">
          <p>More work available on request. We’re happy to sign an NDA.</p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-medium text-ink"
            data-cursor="Talk"
          >
            <span className="link-underline tap-target">Request the full portfolio</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && activeProject && nextProject && (
          <ProjectDialog
            project={activeProject}
            nextProject={nextProject}
            onClose={() => setOpenIndex(null)}
            onNext={() =>
              setOpenIndex((current) =>
                current === null ? 0 : (current + 1) % projects.length,
              )
            }
          />
        )}
      </AnimatePresence>
    </section>
  )
}
