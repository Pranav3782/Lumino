import { motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { site } from '../lib/utils'
import { ProjectVisual } from './ProjectVisual'
import type { Project } from './projects-data'

type ProjectDialogProps = {
  project: Project
  nextProject: Project
  onClose: () => void
  onNext: () => void
}

const EASE = [0.16, 1, 0.3, 1] as const

export function ProjectDialog({
  project,
  nextProject,
  onClose,
  onNext,
}: ProjectDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [project.slug])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }

    if (event.key !== 'Tab') return

    const panel = panelRef.current
    if (!panel) return

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
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

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center md:items-center md:p-6 lg:p-8"
      onKeyDown={handleKeyDown}
    >
      <motion.div
        className="absolute inset-0 bg-ink/55 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[26px] bg-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,.6)] md:max-h-[90vh] md:rounded-[26px]"
        initial={{ opacity: 0, y: 48, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.99 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line bg-paper px-5 py-3.5 md:px-8 md:py-4">
          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
            <span className="eyebrow text-orange-deep">Case study</span>
            <span className="h-1 w-1 rounded-full bg-ink/20" aria-hidden="true" />
            <span className="eyebrow">{project.category}</span>
            <span className="eyebrow text-ink/30">— {project.year}</span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div
          ref={scrollRef}
          data-lenis-prevent
          className="overscroll-contain overflow-y-auto"
        >
          <div className="visual-container relative aspect-[16/10] w-full overflow-hidden border-b border-line sm:aspect-[16/9]">
            <ProjectVisual kind={project.kind} />
          </div>

          <div className="p-6 md:p-10 lg:p-14">
            <p className="eyebrow text-mute">
              {project.name} — {project.year}
            </p>
            <h2
              id="project-dialog-title"
              className="mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.045em]"
            >
              {project.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-mute md:text-base">
              {project.summary}
            </p>

            <div className="mt-10 grid gap-8 border-t border-line pt-8 md:mt-12 md:grid-cols-3 md:gap-7">
              {[
                { label: 'The brief', body: project.brief },
                { label: 'The move', body: project.move },
                { label: 'The outcome', body: project.result },
              ].map((item) => (
                <div key={item.label}>
                  <p className="eyebrow text-orange-deep">{item.label}</p>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-ink/75">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl bg-mist px-5 py-6 md:mt-12 md:gap-8 md:px-8 md:py-8">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[clamp(1.6rem,4vw,2.8rem)] font-medium leading-none tracking-[-0.05em]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[9px] font-medium uppercase leading-tight tracking-[0.14em] text-mute md:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {project.deliverables.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/60"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  `A project like ${project.name}`,
                )}`}
                className="group inline-flex max-w-max items-center gap-3 rounded-full bg-orange px-6 py-3.5 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-orange-deep hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
                data-cursor="Email"
              >
                Start something similar
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>

              <button
                type="button"
                onClick={onNext}
                className="group flex items-center gap-4 text-left focus-visible:outline-none"
              >
                <span className="flex flex-col">
                  <span className="eyebrow text-mute">Next project</span>
                  <span className="mt-1.5 font-display text-lg font-medium tracking-[-0.03em] transition-colors duration-300 group-hover:text-orange-deep md:text-xl">
                    {nextProject.name}
                  </span>
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  )
}
