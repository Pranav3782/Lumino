import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ServiceKind } from './services-data'
import { cn, site } from '../lib/utils'

export function ServicePreview({
  kind,
  title,
  index,
}: {
  kind: ServiceKind
  title: string
  index: string
}) {
  return (
    <div className="w-[320px] overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-float">
      <div className="relative h-[184px] overflow-hidden">
        {kind === 'ui' && <UiArt />}
        {kind === 'web' && <WebArt />}
        {kind === 'brand' && <BrandArt />}
        {kind === 'app' && <AppArt />}
        {kind === 'seo' && <SeoArt />}
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-mute">
            {index} — Service
          </p>
          <p className="mt-0.5 font-display text-[13px] font-medium tracking-[-0.02em]">
            {title}
          </p>
        </div>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white">
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>
    </div>
  )
}

function Frame({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>{children}</div>
  )
}

function UiArt() {
  return (
    <Frame className="bg-[#625BFF]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1.5 text-[7px] font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur">
        <span className="h-1 w-1 rounded-full bg-white" />
        Product OS
      </div>
      <div className="absolute -right-5 -top-6 h-24 w-24 rounded-full border border-white/20" />
      <div className="absolute -right-2 -top-2 h-12 w-12 rounded-full bg-[#FF6535]" />

      <div className="absolute left-4 top-[52px] h-[124px] w-[196px] -rotate-3 rounded-xl bg-white p-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,.35)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-[#E8E4FF]" />
            <span className="text-[7px] font-semibold tracking-[-0.01em] text-ink">
              Overview
            </span>
          </div>
          <span className="rounded-full bg-[#F2F1FF] px-1.5 py-0.5 text-[6px] font-medium text-[#625BFF]">
            Live
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          <div className="flex-1 rounded-lg bg-[#F7F7FB] p-2">
            <p className="text-[6px] uppercase tracking-[0.14em] text-mute">Balance</p>
            <p className="mt-1 font-display text-[13px] font-medium tracking-[-0.03em] text-ink">
              $24,860
            </p>
            <div className="mt-2 flex items-end gap-[3px]">
              {[8, 13, 10, 18, 14, 22, 19].map((height, i) => (
                <span
                  key={i}
                  className="w-[6px] rounded-sm bg-[#625BFF]"
                  style={{ height, opacity: 0.35 + i * 0.09 }}
                />
              ))}
            </div>
          </div>
          <div className="flex w-[74px] flex-col gap-1.5">
            <div className="rounded-lg bg-[#171717] p-2 text-white">
              <p className="text-[6px] uppercase tracking-[0.14em] text-white/50">Tasks</p>
              <p className="mt-0.5 text-[12px] font-medium leading-none">08</p>
            </div>
            <div className="rounded-lg border border-[#EDEBF7] p-2">
              <p className="text-[6px] uppercase tracking-[0.14em] text-mute">Team</p>
              <div className="mt-1.5 flex -space-x-1">
                {['#FFB15C', '#625BFF', '#171717'].map((color) => (
                  <span
                    key={color}
                    className="h-3.5 w-3.5 rounded-full border border-white"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 rounded-lg bg-white/15 px-2 py-1.5 text-[7px] text-white backdrop-blur">
        Design system · 32 components
      </div>
    </Frame>
  )
}

function WebArt() {
  return (
    <Frame className="bg-[#FF6535]">
      <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full border border-ink/15" />
      <div className="absolute -bottom-10 -right-8 h-36 w-36 rounded-full bg-[#FFD9C9]/60" />
      <div className="absolute left-1/2 top-1/2 h-[150px] w-[240px] -translate-x-1/2 -translate-y-1/2 rotate-2 overflow-hidden rounded-lg bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,.3)]">
        <div className="flex h-5 items-center gap-1 border-b border-[#EEE] px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6535]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E7E7E7]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E7E7E7]" />
          <span className="ml-2 rounded bg-[#F5F5F5] px-6 py-0.5 text-[5px] text-mute">
            luminotech.solutions
          </span>
        </div>
        <div className="relative h-[130px] bg-[#141414] p-3 text-white">
          <div className="flex items-center justify-between">
            <span className="font-display text-[10px] font-medium tracking-[-0.04em]">
              Lumino<span className="text-[#FF6535]">.</span>
            </span>
            <span className="h-3 w-3 rounded-full bg-[#FF6535]" />
          </div>
          <p className="mt-4 font-display text-[22px] leading-[0.92] tracking-[-0.05em]">
            Digital
            <br />
            with intent.
          </p>
          <div className="mt-2 h-px w-20 bg-white/20" />
          <div className="absolute bottom-3 right-3 rounded-full bg-[#625BFF] px-2 py-1 text-[6px] font-medium text-white">
            View work ↗
          </div>
          <div className="absolute bottom-3 left-3 text-[5px] uppercase tracking-[0.16em] text-white/40">
            Est. {site.founded}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 rounded-md bg-white/20 px-2 py-1 text-[6px] font-medium uppercase tracking-[0.16em] text-white">
        Built for speed
      </div>
    </Frame>
  )
}

function BrandArt() {
  return (
    <Frame className="bg-[#ECE5D7]">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(23,23,23,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,23,.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute -right-7 top-6 h-28 w-28 rounded-full bg-[#FF6535]" />
      <div className="absolute left-5 top-5 text-[7px] font-medium uppercase tracking-[0.18em] text-ink/50">
        Identity system — Vol. 02
      </div>
      <div className="absolute left-6 top-[54px] font-display text-[74px] font-medium leading-none tracking-[-0.06em] text-[#171717]">
        Aa
      </div>
      <div className="absolute left-6 top-[138px] h-px w-[120px] bg-ink/20" />
      <div className="absolute bottom-4 left-6 flex items-center gap-2">
        {['#171717', '#FF6535', '#ECE5D7', '#625BFF'].map((color) => (
          <span
            key={color}
            className="h-3.5 w-3.5 rounded-full border border-ink/10"
            style={{ background: color }}
          />
        ))}
      </div>
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/40">
        <span className="font-display text-[13px] font-medium text-ink">L.</span>
      </div>
      <div className="absolute bottom-4 right-4 rounded-md bg-ink px-2 py-1.5 text-[6px] font-medium uppercase tracking-[0.16em] text-white">
        Type · Colour · Voice
      </div>
    </Frame>
  )
}

function AppArt() {
  return (
    <Frame className="bg-[#171717]">
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.35)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-[6px] font-medium uppercase tracking-[0.14em] text-white/80">
        <span className="h-1 w-1 rounded-full bg-[#FF6535]" />
        Cross-platform
      </div>

      <div className="absolute left-[30px] top-[36px] h-[134px] w-[78px] -rotate-6 overflow-hidden rounded-[17px] border-[3px] border-[#303030] bg-[#FAFAF8] p-2 shadow-[0_16px_30px_-10px_rgba(0,0,0,.5)]">
        <div className="flex items-center justify-between text-[5px] font-semibold text-ink/70">
          <span>9:41</span>
          <span className="h-1 w-3 rounded-full bg-ink/20" />
        </div>
        <p className="mt-2 text-[5px] uppercase tracking-[0.14em] text-mute">Projects</p>
        <p className="font-display text-[14px] font-medium leading-none tracking-[-0.04em] text-ink">
          12 active
        </p>
        <div className="mt-2 space-y-1.5">
          {['Northwind', 'Orbit Labs'].map((label, i) => (
            <div key={label} className="rounded-md bg-[#EFEEFF] p-1.5">
              <div className="flex items-center gap-1">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: i === 0 ? '#625BFF' : '#FF6535' }}
                />
                <span className="text-[5px] font-medium text-ink">{label}</span>
              </div>
              <div className="mt-1 h-0.5 w-8 rounded-full bg-ink/10" />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-2 bottom-2 flex items-center justify-around rounded-full bg-ink px-2 py-1">
          <span className="h-1 w-1 rounded-full bg-white" />
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span className="h-1 w-1 rounded-full bg-white/30" />
        </div>
      </div>

      <div className="absolute right-[24px] top-[18px] h-[154px] w-[88px] rotate-6 overflow-hidden rounded-[19px] border-[3px] border-[#303030] bg-[#625BFF] p-2.5 text-white shadow-[0_16px_30px_-10px_rgba(0,0,0,.5)]">
        <div className="mx-auto h-1 w-6 rounded-full bg-white/30" />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[6px] font-semibold">Lumino</p>
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-white/15 text-[5px]">
            P
          </span>
        </div>
        <p className="mt-2 text-[5px] text-white/55">Good morning</p>
        <div className="mt-1 rounded-lg bg-white/12 p-2">
          <p className="text-[5px] uppercase tracking-[0.14em] text-white/55">Today</p>
          <p className="mt-0.5 font-display text-[14px] font-medium leading-none tracking-[-0.04em]">
            86%
          </p>
          <div className="mt-1.5 flex items-end gap-1">
            {[7, 12, 9, 16, 13, 19].map((height, i) => (
              <span
                key={i}
                className="w-1.5 rounded-sm bg-white/80"
                style={{ height, opacity: 0.4 + i * 0.1 }}
              />
            ))}
          </div>
        </div>
        <div className="mt-1.5 rounded-md bg-white px-2 py-1 text-ink">
          <p className="text-[5px] font-semibold">Sync complete</p>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1.5 text-[6px] font-medium uppercase tracking-[0.14em] text-white/80">
        <span className="h-1 w-1 rounded-full bg-[#FF6535]" />
        Built for everyday use
      </div>
      <div className="absolute bottom-4 right-4 text-[6px] uppercase tracking-[0.16em] text-white/30">
        04 / Mobile
      </div>
    </Frame>
  )
}

function SeoArt() {
  return (
    <Frame className="bg-[#EEECFF]">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(98,91,255,.12)_1px,transparent_1px)] [background-size:100%_26px]" />
      <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[7px] font-medium text-ink shadow-sm">
        <span className="h-1 w-1 rounded-full bg-emerald-500" />
        Organic performance
      </div>
      <div className="absolute left-5 top-[58px] w-[140px] rounded-xl bg-white p-3 shadow-[0_14px_30px_-14px_rgba(23,23,23,.35)]">
        <p className="text-[6px] uppercase tracking-[0.16em] text-mute">Visibility score</p>
        <div className="mt-1 flex items-end justify-between">
          <p className="font-display text-[28px] font-medium leading-none tracking-[-0.05em] text-ink">
            94
          </p>
          <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[6px] font-medium text-emerald-600">
            +38%
          </span>
        </div>
        <div className="mt-2 flex items-end gap-1">
          {[6, 10, 9, 15, 18, 22, 26].map((height, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-[#625BFF]"
              style={{ height, opacity: 0.3 + i * 0.1 }}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 right-4 w-[112px] rotate-[-3deg] rounded-lg bg-[#171717] p-2.5 text-white shadow-lg">
        <p className="text-[6px] uppercase tracking-[0.14em] text-white/50">Rankings</p>
        <div className="mt-1.5 space-y-1">
          {['custom websites', 'ui ux design', 'seo growth'].map((label, i) => (
            <div key={label} className="flex items-center justify-between text-[6px]">
              <span className="text-white/75">{label}</span>
              <span className="text-[#FFB15C]">#{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}
