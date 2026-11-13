import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

export function InlineVisual() {
  const reduce = useReducedMotion()

  return (
    <motion.span
      className="group relative mx-[0.18em] inline-block h-[0.62em] w-[1.16em] translate-y-[0.02em] overflow-hidden rounded-[0.31em] border border-ink/10 bg-[#181818] align-middle shadow-[0_10px_30px_-14px_rgba(23,23,23,0.55)]"
      initial={reduce ? false : { scale: 0.7, opacity: 0, rotate: -6 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
      whileHover={reduce ? undefined : { scale: 1.06, rotate: -2 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 128 70" className="h-full w-full" role="presentation">
        <defs>
          <linearGradient id="inline-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFB15C" />
            <stop offset="100%" stopColor="#FF6535" />
          </linearGradient>
          <radialGradient id="inline-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD6A8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF6535" stopOpacity="0" />
          </radialGradient>
          <clipPath id="inline-clip">
            <rect width="128" height="70" rx="20" />
          </clipPath>
        </defs>
        <g clipPath="url(#inline-clip)">
          <rect width="128" height="70" fill="#181819" />
          <motion.circle
            cx="30"
            cy="38"
            r="29"
            fill="url(#inline-glow)"
            animate={reduce ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [0.94, 1.04, 0.94] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <motion.g
            animate={reduce ? undefined : { y: [0, -1.6, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="30" cy="38" r="21" fill="url(#inline-sky)" />
            <circle cx="30" cy="38" r="21" fill="#FFE2B0" opacity="0.14" />
            <path
              d="M52 70c0-22 13-38 32-38s32 16 32 38Z"
              fill="#625BFF"
              opacity="0.95"
            />
            <path
              d="M69 70c0-15 8-27 20-27s20 12 20 27Z"
              fill="#EAE7FF"
              opacity="0.9"
            />
            <motion.path
              d="M94 8c3 8 8 13 16 16-8 3-13 8-16 16-3-8-8-13-16-16 8-3 13-8 16-16Z"
              fill="#F7F7F7"
              animate={
                reduce
                  ? undefined
                  : { opacity: [0.55, 1, 0.55], scale: [0.9, 1.08, 0.9] }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M16 8h30"
              stroke="#F7F7F7"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={reduce ? undefined : { opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
            <path
              d="M16 62h18"
              stroke="#F7F7F7"
              strokeOpacity="0.28"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.g>
        </g>
      </svg>
      <motion.span
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/14 to-transparent"
        animate={reduce ? undefined : { x: ['0%', '420%'] }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          repeatDelay: 2.4,
          ease: 'easeInOut',
        }}
      />
      <span className="pointer-events-none absolute inset-0 rounded-[0.31em] ring-1 ring-inset ring-white/15 transition group-hover:ring-white/30" />
    </motion.span>
  )
}
