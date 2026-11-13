export function LumenVisual() {
  return (
    <div className="visual-container absolute inset-0 overflow-hidden bg-[#EFE4D2] text-ink">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgba(23,23,23,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.06) 1px, transparent 1px)',
          backgroundSize: '9cqw 9cqw',
        }}
      />

      <div className="absolute left-[4.5cqw] top-[4.5cqw] flex items-center gap-[1.8cqw]">
        <span className="font-display text-[2.6cqw] font-semibold tracking-[-0.04em]">
          LUMEN<span className="text-[1.6cqw] align-top">®</span>
        </span>
        <span className="h-[3cqw] w-px bg-ink/20" />
        <span className="text-[1.15cqw] font-medium uppercase tracking-[0.22em] text-ink/55">
          A warmer kind of light
        </span>
      </div>
      <div className="absolute right-[4.5cqw] top-[4.5cqw] text-[1.15cqw] font-medium uppercase tracking-[0.2em] text-ink/55">
        Copenhagen — 2025
      </div>

      <div className="absolute right-[-8cqw] top-1/2 h-[62cqw] w-[62cqw] -translate-y-1/2 rounded-full border border-ink/15" />
      <div className="absolute right-[-2cqw] top-1/2 h-[48cqw] w-[48cqw] -translate-y-1/2 rounded-full bg-[#FF6535]" />
      <div className="absolute right-[10cqw] top-[22cqw] h-[6cqw] w-[6cqw] rounded-full bg-[#FFD7A8] opacity-80 blur-[1px]" />
      <div className="absolute right-[6cqw] top-1/2 h-[34cqw] w-[34cqw] -translate-y-1/2 rounded-full border border-white/30" />

      <div className="absolute bottom-[6cqw] left-[4.5cqw]">
        <div className="font-display text-[16cqw] font-medium leading-[0.8] tracking-[-0.07em]">
          Lumen
        </div>
        <div className="mt-[2.5cqw] flex items-center gap-[2cqw] text-[1.15cqw] font-medium uppercase tracking-[0.2em] text-ink/55">
          <span>Identity</span>
          <span className="h-[1.5cqw] w-px bg-ink/20" />
          <span>Digital</span>
          <span className="h-[1.5cqw] w-px bg-ink/20" />
          <span>Art direction</span>
        </div>
      </div>

      <div className="absolute bottom-[7cqw] right-[5cqw] w-[30cqw] -rotate-3 rounded-[1.6cqw] bg-[#FCFAF6] p-[2.4cqw] shadow-[0_3cqw_6cqw_-2cqw_rgba(23,23,23,.28)]">
        <div className="flex items-center justify-between">
          <span className="text-[1.05cqw] font-medium uppercase tracking-[0.2em] text-ink/45">
            Arc — 01
          </span>
          <span className="text-[1.05cqw] text-ink/45">€ 480</span>
        </div>
        <svg viewBox="0 0 200 120" className="mt-[1.4cqw] w-full">
          <ellipse cx="100" cy="111" rx="52" ry="5" fill="#171717" opacity="0.08" />
          <path
            d="M54 108c0-40 20-66 46-66s46 26 46 66"
            stroke="#171717"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="46" cy="46" r="22" fill="#FF6535" />
          <path d="M54 108V70" stroke="#171717" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="42" r="3" fill="#171717" />
        </svg>
        <div className="mt-[1.2cqw] flex items-center justify-between">
          <span className="font-display text-[2cqw] font-medium tracking-[-0.03em]">
            Arc table lamp
          </span>
          <span className="flex h-[3.2cqw] w-[3.2cqw] items-center justify-center rounded-full bg-ink text-[1.4cqw] text-white">
            ↗
          </span>
        </div>
      </div>

      <div className="absolute left-[4.5cqw] top-1/2 -translate-y-1/2 -rotate-90 text-[1cqw] font-medium uppercase tracking-[0.3em] text-ink/35">
        Objects for better light
      </div>

      <div className="absolute bottom-[4.5cqw] left-1/2 -translate-x-1/2 text-[1.05cqw] font-medium uppercase tracking-[0.2em] text-ink/35">
        01 — 04
      </div>
    </div>
  )
}

export function MeridianVisual() {
  return (
    <div className="visual-container absolute inset-0 overflow-hidden bg-[#625BFF] text-white">
      <div className="absolute inset-0">
        <div className="absolute -right-[10cqw] -top-[18cqw] h-[60cqw] w-[60cqw] rounded-full border border-white/15" />
        <div className="absolute -right-[2cqw] -top-[8cqw] h-[34cqw] w-[34cqw] rounded-full border border-white/15" />
        <div
          className="absolute bottom-[8%] left-[6%] h-[2px] w-[88%] opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,.7) 0 1px, transparent 1px 8cqw)',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute -bottom-[16cqw] left-1/2 -translate-x-1/2 select-none font-display text-[42cqw] font-semibold leading-none tracking-[-0.08em] text-white/[0.06]"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}
        aria-hidden="true"
      >
        M
      </div>

      <div className="absolute left-[4.5cqw] top-[4.5cqw] flex items-center gap-[1.6cqw]">
        <span className="font-display text-[2.3cqw] font-medium tracking-[-0.04em]">
          meridian<span className="text-[#FFB15C]">°</span>
        </span>
        <span className="rounded-full border border-white/25 px-2 py-[0.4cqw] text-[0.95cqw] font-medium uppercase tracking-[0.18em] text-white/70">
          Digital banking
        </span>
      </div>
      <div className="absolute right-[4.5cqw] top-[4.5cqw] text-[1.05cqw] font-medium uppercase tracking-[0.2em] text-white/60">
        Product — 2025
      </div>

      <div className="absolute left-[8cqw] top-1/2 w-[37cqw] -translate-y-1/2 -rotate-3 rounded-[2.4cqw] bg-[#FBFAFF] p-[2.6cqw] text-ink shadow-[0_4cqw_7cqw_-2cqw_rgba(23,23,23,.35)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[1.2cqw]">
            <span className="flex h-[3.6cqw] w-[3.6cqw] items-center justify-center rounded-full bg-[#EEECFF] font-display text-[1.6cqw] font-semibold text-[#625BFF]">
              M
            </span>
            <div>
              <p className="text-[0.95cqw] uppercase tracking-[0.14em] text-mute">
                Everyday account
              </p>
              <p className="text-[1.15cqw] font-medium">Meridian</p>
            </div>
          </div>
          <span className="h-[2.6cqw] w-[2.6cqw] rounded-full bg-[#171717]/5" />
        </div>
        <p className="mt-[2.8cqw] text-[1.05cqw] uppercase tracking-[0.16em] text-mute">
          Available balance
        </p>
        <p className="mt-[0.6cqw] font-display text-[5.4cqw] font-medium leading-none tracking-[-0.05em]">
          $24,860<span className="text-[2.6cqw] text-mute">.00</span>
        </p>
        <div className="mt-[2.4cqw] flex items-end gap-[0.8cqw]">
          {[26, 34, 30, 46, 40, 54, 62, 58, 72].map((height, i) => (
            <span
              key={i}
              className="flex-1 rounded-[0.4cqw] bg-[#625BFF]"
              style={{ height: `${height / 8}cqw`, opacity: 0.28 + i * 0.07 }}
            />
          ))}
        </div>
        <div className="mt-[2.4cqw] space-y-[1.4cqw]">
          {[
            { label: 'Studio rent', value: '−$1,200', tone: 'bg-[#FFE4D8]' },
            { label: 'Northwind', value: '+$2,400', tone: 'bg-[#E4E2FF]' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="flex items-center gap-[1.2cqw] text-[1.1cqw]">
                <span className={`h-[2.4cqw] w-[2.4cqw] rounded-full ${item.tone}`} />
                {item.label}
              </span>
              <span
                className={`text-[1.1cqw] font-medium ${
                  item.value.startsWith('+') ? 'text-emerald-600' : 'text-ink'
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[8cqw] right-[6cqw] w-[27cqw] rotate-3 rounded-[2cqw] bg-[#171717] p-[2.2cqw] text-white shadow-[0_4cqw_6cqw_-2cqw_rgba(0,0,0,.5)]">
        <p className="text-[0.95cqw] uppercase tracking-[0.18em] text-white/45">Quick send</p>
        <div className="mt-[1.6cqw] flex items-center gap-[1.2cqw]">
          {['#FFB15C', '#72D6A0', '#D8D3FF'].map((color) => (
            <span
              key={color}
              className="h-[4cqw] w-[4cqw] rounded-full border-2 border-[#171717]"
              style={{ background: color }}
            />
          ))}
          <span className="flex h-[4cqw] w-[4cqw] items-center justify-center rounded-full border border-white/25 text-[1.4cqw] text-white/60">
            +
          </span>
        </div>
        <div className="mt-[1.8cqw] flex items-center justify-between rounded-full bg-white/10 px-2 py-[1cqw]">
          <span className="pl-[1cqw] text-[1.05cqw] text-white/60">Send $240</span>
          <span className="flex h-[3.4cqw] w-[3.4cqw] items-center justify-center rounded-full bg-[#FF6535] text-[1.4cqw] text-ink">
            ↗
          </span>
        </div>
      </div>

      <div className="absolute left-[5cqw] top-[45%] w-[1px] -translate-y-1/2 bg-white/20" />
      <div className="absolute left-[6.5cqw] top-[45%] w-[18cqw] -translate-y-1/2 text-[1cqw] font-medium uppercase leading-[1.7] tracking-[0.22em] text-white/55">
        Banking,
        <br />
        rethought around calm
      </div>

      <div className="absolute right-[4.5cqw] bottom-[4.5cqw] flex items-center gap-[1.4cqw] rounded-full bg-white/10 px-2 py-[1cqw] text-[0.95cqw] font-medium uppercase tracking-[0.16em] text-white/75 backdrop-blur">
        <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-emerald-400" />
        Live in 3 markets
      </div>
    </div>
  )
}

export function FormVisual() {
  return (
    <div className="visual-container absolute inset-0 overflow-hidden bg-[#E8E1D7] text-ink">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(23,23,23,.05) 1px, transparent 1px)',
          backgroundSize: '12cqw 12cqw',
        }}
      />
      <div className="absolute left-[5cqw] top-[5cqw]">
        <div className="font-display text-[2.4cqw] font-medium uppercase leading-none tracking-[0.18em]">
          Atelier
          <br />
          Form
        </div>
      </div>
      <div className="absolute right-[5cqw] top-[5cqw] text-right text-[1.05cqw] font-medium uppercase leading-[1.7] tracking-[0.2em] text-ink/50">
        Collection 04
        <br />
        Lisbon — 2024
      </div>

      <div className="absolute bottom-[16cqw] left-[14cqw] h-[36cqw] w-[36cqw] rounded-full bg-[#FF6535]" />
      <div className="absolute bottom-[10cqw] left-[20cqw] h-[1px] w-[90cqw] bg-ink/10" />
      <div className="absolute bottom-[11cqw] left-[30cqw] h-[4cqw] w-[60cqw] rounded-full bg-ink/10 blur-[2cqw]" />

      <div className="absolute left-1/2 top-1/2 w-[58cqw] -translate-x-1/2 -translate-y-[54%] rotate-[-2deg] drop-shadow-[0_3cqw_4cqw_rgba(23,23,23,.18)]">
        <svg viewBox="0 0 320 300" className="h-auto w-full">
          <path
            d="M84 66c0-26 21-46 47-46h58c26 0 47 20 47 46v74c0 18-14 31-32 31H116c-18 0-32-13-32-31V66Z"
            fill="#2B2723"
          />
          <path
            d="M70 142h180c15 0 27 12 27 27v8c0 10-8 18-18 18H61c-10 0-18-8-18-18v-8c0-15 12-27 27-27Z"
            fill="#37312B"
          />
          <path
            d="M148 128h24c6 0 10 4 10 10v10c0 6-4 10-10 10h-24c-6 0-10-4-10-10v-10c0-6 4-10 10-10Z"
            fill="#FF6535"
          />
          <path
            d="M96 194 76 262M224 194l20 68"
            stroke="#2B2723"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M124 60v74M196 60v74"
            stroke="#F3EDE3"
            strokeWidth="1.5"
            opacity="0.2"
          />
          <path
            d="M160 54v52"
            stroke="#F3EDE3"
            strokeWidth="1.2"
            opacity="0.14"
          />
        </svg>
      </div>

      <div className="absolute bottom-[6cqw] left-[5cqw] flex items-center gap-[2cqw] text-[1.05cqw] font-medium uppercase tracking-[0.2em] text-ink/55">
        <span>Form lounge</span>
        <span className="h-[1.4cqw] w-px bg-ink/20" />
        <span>Oak / bouclé</span>
      </div>

      <div className="absolute bottom-[6cqw] right-[5cqw] rotate-2 rounded-[1.4cqw] border border-ink/10 bg-[#F6F2EA] px-[2.4cqw] py-[1.8cqw] shadow-[0_2cqw_4cqw_-1.5cqw_rgba(23,23,23,.25)]">
        <p className="text-[0.95cqw] font-medium uppercase tracking-[0.18em] text-ink/45">
          Object 04
        </p>
        <p className="mt-[0.6cqw] font-display text-[2.4cqw] font-medium tracking-[-0.03em]">
          The Form Lounge
        </p>
        <div className="mt-[0.6cqw] flex items-center justify-between text-[1.05cqw] text-ink/55">
          <span>Made to order</span>
          <span className="font-medium text-ink">$2,640</span>
        </div>
      </div>

      <div className="absolute right-[5cqw] top-1/2 -translate-y-1/2 rotate-90 text-[0.95cqw] font-medium uppercase tracking-[0.3em] text-ink/35">
        Objects for slow living
      </div>

      <div className="absolute left-1/2 top-[4.5cqw] -translate-x-1/2 text-[0.95cqw] font-medium uppercase tracking-[0.2em] text-ink/35">
        03 — 04
      </div>
    </div>
  )
}

export function NocturneVisual() {
  return (
    <div className="visual-container absolute inset-0 overflow-hidden bg-[#0E0E0F] text-white">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(45% 55% at 15% 85%, rgba(255,101,53,0.42), transparent 70%), radial-gradient(40% 50% at 88% 12%, rgba(98,91,255,0.4), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-display text-[19cqw] font-semibold leading-none tracking-[-0.06em] text-transparent"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.16)' }}
        aria-hidden="true"
      >
        NOCTURNE
      </div>

      <div className="absolute left-[4.5cqw] top-[4.5cqw] flex items-center gap-[1.4cqw]">
        <span className="font-display text-[2.2cqw] font-medium tracking-[-0.03em]">
          Nocturne<span className="text-[#FF6535]">.</span>
        </span>
        <span className="h-[2.4cqw] w-[2.4cqw] rounded-full border border-white/25" />
      </div>
      <div className="absolute right-[4.5cqw] top-[4.5cqw] text-[1.05cqw] font-medium uppercase tracking-[0.2em] text-white/55">
        A festival of sound & light
      </div>

      <div className="absolute left-1/2 top-[55%] w-[46cqw] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-[2.2cqw] border border-white/15 bg-white/[0.08] p-[3cqw] backdrop-blur-md">
        <div className="flex items-center justify-between text-[0.95cqw] font-medium uppercase tracking-[0.2em] text-white/55">
          <span>22 — 24 August 2026</span>
          <span>Lisbon, PT</span>
        </div>
        <div className="mt-[2.6cqw] font-display text-[5.2cqw] font-medium leading-[0.95] tracking-[-0.05em]">
          Three nights.
          <br />
          <span className="text-[#FFB15C]">One frequency.</span>
        </div>
        <div className="mt-[2.6cqw] flex items-end justify-between gap-[2cqw]">
          <div className="space-y-[0.9cqw] text-[1.15cqw] text-white/65">
            {['Aria Cole', 'Mono / Stereo', 'The Quiet Hours', 'Kōji & guests'].map(
              (artist, i) => (
                <div key={artist} className="flex items-center gap-[1.2cqw]">
                  <span className="text-[0.8cqw] text-white/35">0{i + 1}</span>
                  {artist}
                </div>
              ),
            )}
          </div>
          <div className="flex flex-col items-end gap-[1.2cqw]">
            <span className="rounded-full bg-[#FF6535] px-[1.8cqw] py-[1cqw] text-[1cqw] font-medium uppercase tracking-[0.14em] text-ink">
              Tickets live
            </span>
            <span className="flex h-[4.6cqw] w-[4.6cqw] items-center justify-center rounded-full border border-white/30 text-[1.7cqw]">
              ↗
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7cqw] left-[4.5cqw] flex items-center gap-[1.6cqw]">
        <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#FF6535]" />
        <span className="text-[1cqw] font-medium uppercase tracking-[0.2em] text-white/55">
          Field notes — Vol. 03
        </span>
      </div>

      <div className="absolute bottom-[4.5cqw] left-0 right-0 overflow-hidden border-t border-white/10 pt-[2.2cqw] text-center text-[0.95cqw] font-medium uppercase tracking-[0.3em] text-white/30">
        Sound · Light · Space · People · Lisbon · 2026
      </div>

      <div className="absolute left-[7cqw] top-[24%] h-[2px] w-[9cqw] bg-white/20" />
      <div className="absolute right-[8cqw] top-[70%] h-[5cqw] w-[5cqw] rounded-full border border-white/15" />
    </div>
  )
}
