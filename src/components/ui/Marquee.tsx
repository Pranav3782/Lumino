import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type MarqueeProps = {
  items: string[]
  speed?: number
  className?: string
  itemClassName?: string
  separator?: ReactNode
  direction?: 'left' | 'right'
}

export function Marquee({
  items,
  speed = 42,
  className,
  itemClassName,
  separator = '✦',
  direction = 'left',
}: MarqueeProps) {
  const group = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={cn(
            'flex shrink-0 items-center gap-6 pr-10 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70 sm:gap-10 sm:pr-14',
            itemClassName,
          )}
        >
          <span className="whitespace-nowrap">{item}</span>
          <span className="text-[13px] leading-none text-orange" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={cn('marquee-host overflow-hidden', className)} aria-hidden="true">
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ '--marquee-duration': `${speed}s` } as CSSProperties}
      >
        {group}
        {group}
      </div>
    </div>
  )
}
