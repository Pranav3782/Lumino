import { cn } from '../../lib/utils'

type SectionLabelProps = {
  index: string
  children: string
  className?: string
}

export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-4 border-t border-line pt-5', className)}>
      <span className="eyebrow tabular-nums">{index}</span>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}
