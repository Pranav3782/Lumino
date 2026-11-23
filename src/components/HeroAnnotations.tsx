import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'
import type { WordCycleState } from './WordCycler'

export type HeroAnnotationLayout = {
  wordLeft: number
  wordRight: number
  wordWidth: number
  wordHeight: number
  wordCenterY: number
  greatLeft: number
  sectionWidth: number
  fontSize: number
}

type ArrowTone = 'violet' | 'orange'

const VIOLET = '#625BFF'
const ORANGE = '#FF6535'
const CIRCLE_WIDTH = 202
const CIRCLE_HEIGHT = 82
const CIRCLE_PATH =
  'M198 43C200 14 158 2 102 2C46 2 2 14 2 41C2 68 46 80 101 80C156 80 200 68 198 43Z'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - clamp(value, 0, 1), 3)
}

function CursorTag({
  name,
  tone,
  x,
  y,
  angle,
  labelX,
  labelY,
  labelAlign = 'center',
  opacity,
}: {
  name: string
  tone: ArrowTone
  x: number
  y: number
  angle: number
  labelX: number
  labelY: number
  labelAlign?: 'center' | 'right'
  opacity: number
}) {
  const color = tone === 'violet' ? VIOLET : ORANGE
  const labelTone = tone === 'violet' ? 'bg-indigo text-white' : 'bg-orange text-ink'

  return (
    <div
      data-annotation={name.toLowerCase()}
      data-cursor-x={x.toFixed(2)}
      data-cursor-y={y.toFixed(2)}
      data-cursor-opacity={opacity.toFixed(3)}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-30 will-change-transform"
      style={{
        opacity,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <svg
        width="17"
        height="18"
        viewBox="0 0 16 17"
        fill="none"
        className="h-[15px] w-[14px] overflow-visible md:h-[19px] md:w-[17px]"
        style={{
          transform: `translate(-0.6px, -0.6px) rotate(${angle}deg)`,
          transformOrigin: '0 0',
        }}
      >
        <path
          d="M0 0 14.2 5.7 7.8 8.4 5.5 15.2Z"
          fill={color}
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span
        data-cursor-label={name.toLowerCase()}
        className={cn(
          'pointer-events-none absolute left-0 top-0 hidden whitespace-nowrap rounded-full px-1 py-0.5 text-[8px] font-medium leading-none tracking-[0.01em] shadow-pill min-[390px]:inline-block md:px-2 md:py-0.5 md:text-[9px] md:tracking-[0.02em]',
          labelTone,
        )}
        style={{
          transform: `translate3d(${labelX - x}px, ${labelY - y}px, 0) translate(${labelAlign === 'right' ? '-100%' : '-50%'}, -50%)`,
        }}
      >
        {name}
      </span>
    </div>
  )
}

function SuryaCursor({
  layout,
  state,
}: {
  layout: HeroAnnotationLayout
  state: WordCycleState
}) {
  const reduce = Boolean(state.reduce)
  const hidden = !reduce && (state.stage === 'idle' || state.stage === 'exit')
  const opacity = reduce
    ? 1
    : hidden
      ? 0
      : Math.min(1, easeOutCubic(state.suryaProgress) * 1.35)

  const startX = Math.max(10, layout.wordLeft - 48)
  const startY = layout.wordCenterY + layout.wordHeight * 0.48
  const edgeX = layout.wordLeft + layout.wordWidth * state.highlightProgress
  const edgeY = layout.wordCenterY + layout.wordHeight * 0.34
  const progress = reduce ? 1 : easeOutCubic(state.suryaProgress)
  const x = reduce ? layout.wordLeft - 26 : lerp(startX, edgeX, progress)
  const y = reduce ? layout.wordCenterY : lerp(startY, edgeY, progress)
  const wordBottom = layout.wordCenterY + layout.wordHeight / 2
  const labelX = clamp(x - 8, 34, Math.max(34, layout.sectionWidth - 34))
  const labelY = wordBottom + 8

  return (
    <CursorTag
      name="SURYA"
      tone="violet"
      x={x}
      y={y}
      angle={135}
      labelX={labelX}
      labelY={labelY}
      labelAlign="right"
      opacity={opacity}
    />
  )
}

function WordCircle({
  layout,
  state,
}: {
  layout: HeroAnnotationLayout
  state: WordCycleState
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const reduce = Boolean(state.reduce)

  useLayoutEffect(() => {
    if (!pathRef.current) return
    const length = pathRef.current.getTotalLength()
    if (Number.isFinite(length) && length > 0) setPathLength(length)
  }, [])

  const padX = clamp(layout.fontSize * 0.15, 10, 20)
  const padY = clamp(layout.fontSize * 0.19, 12, 25)
  const width = layout.wordWidth + padX * 2
  const height = layout.wordHeight + padY * 2
  const left = layout.wordLeft - padX
  const top = layout.wordCenterY - height / 2
  const circleProgress = reduce ? 1 : state.circleProgress
  const pathVisible =
    reduce ||
    (state.stage !== 'idle' &&
      state.stage !== 'exit' &&
      state.stage !== 'enter' &&
      circleProgress > 0)
  const path = pathRef.current
  const length = pathLength > 0 ? pathLength : 0

  const pointAt = (progress: number) => {
    if (!path || !length) return { x: 198, y: 43 }
    return path.getPointAtLength(length * clamp(progress, 0, 1))
  }

  const step = 1 / Math.max(length, 1)
  const current = pointAt(circleProgress)
  const tangentFrom =
    circleProgress >= 1 ? pointAt(1 - step) : current
  const tangentTo =
    circleProgress >= 1 ? pointAt(1) : pointAt(circleProgress + step)
  const scaleX = width / CIRCLE_WIDTH
  const scaleY = height / CIRCLE_HEIGHT
  const toScreen = (point: { x: number; y: number }) => ({
    x: left + point.x * scaleX,
    y: top + point.y * scaleY,
  })
  const currentScreen = toScreen(current)
  const tangentFromScreen = toScreen(tangentFrom)
  const tangentToScreen = toScreen(tangentTo)
  const startScreen = toScreen(pointAt(0))
  const pathAngle =
    (Math.atan2(
      tangentToScreen.y - tangentFromScreen.y,
      tangentToScreen.x - tangentFromScreen.x,
    ) *
      180) /
    Math.PI
  const approachStartX = Math.min(
    layout.sectionWidth - 14,
    layout.wordRight + 46,
  )
  const approachStartY = Math.max(14, layout.wordCenterY - layout.wordHeight * 0.55)
  const lumenProgress = reduce ? 1 : easeOutCubic(state.lumenProgress)
  const movedX = lerp(approachStartX, startScreen.x, lumenProgress)
  const movedY = lerp(approachStartY, startScreen.y, lumenProgress)
  const lumenX = circleProgress > 0 ? currentScreen.x : movedX
  const lumenY = circleProgress > 0 ? currentScreen.y : movedY
  const centerX = left + width * (101 / CIRCLE_WIDTH)
  const centerY = top + height * (41 / CIRCLE_HEIGHT)
  const radialX = lumenX - centerX
  const radialY = lumenY - centerY
  const radialLength = Math.hypot(radialX, radialY) || 1
  const normalizedX = radialX / radialLength
  const normalizedY = radialY / radialLength
  const wordTop = layout.wordCenterY - layout.wordHeight / 2
  const wordBottom = layout.wordCenterY + layout.wordHeight / 2
  const labelClamp = Math.max(34, layout.sectionWidth - 34)
  const wide = layout.fontSize >= 56
  let labelX = clamp(lumenX, 34, labelClamp)
  let labelY = wordBottom + 8

  if (!wide) {
    labelX = clamp(lumenX + 10, 34, labelClamp)
  } else if (Math.abs(normalizedY) >= Math.abs(normalizedX) * 0.75) {
    labelX = clamp(lumenX + normalizedX * 8, 34, labelClamp)
    labelY = normalizedY < 0 ? wordTop - 8 : wordBottom + 8
  } else {
    labelX = clamp(lumenX + Math.sign(normalizedX || 1) * 60, 34, labelClamp)
    labelY = lumenY
  }
  const lumenHidden =
    !reduce && (state.stage === 'idle' || state.stage === 'exit')
  const lumenOpacity = reduce
    ? 1
    : lumenHidden
      ? 0
      : Math.min(1, easeOutCubic(state.lumenProgress) * 1.35)

  return (
    <>
      <div
        data-circle-anchor="word"
        aria-hidden="true"
        className="pointer-events-none absolute z-0 overflow-visible"
        style={{
          left,
          top,
          width,
          height,
        }}
      >
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${CIRCLE_WIDTH} ${CIRCLE_HEIGHT}`}
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <path
            ref={pathRef}
            data-annotation="circle"
            data-circle-progress={circleProgress.toFixed(4)}
            data-path-length={pathLength.toFixed(2)}
            d={CIRCLE_PATH}
            vectorEffect="non-scaling-stroke"
            stroke={state.word.accent}
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={length ? `${length} ${length}` : '0 9999'}
            strokeDashoffset={length ? length * (1 - circleProgress) : 0}
            style={{
              opacity: pathVisible ? 0.82 : 0,
              transition: 'opacity 120ms linear',
            }}
          />
        </svg>
      </div>

      <CursorTag
        name="LUMEN"
        tone="orange"
        x={lumenX}
        y={lumenY}
        angle={pathAngle + 135}
        labelX={labelX}
        labelY={labelY}
        opacity={lumenOpacity}
      />
    </>
  )
}

export function HeroAnnotations({
  state,
  layout,
}: {
  state: WordCycleState
  layout: HeroAnnotationLayout | null
}) {
  if (!layout) return null

  return (
    <div
      data-word-top={(layout.wordCenterY - layout.wordHeight / 2).toFixed(2)}
      data-word-bottom={(layout.wordCenterY + layout.wordHeight / 2).toFixed(2)}
      className="pointer-events-none absolute inset-0 select-none"
    >
      <SuryaCursor layout={layout} state={state} />
      <WordCircle layout={layout} state={state} />
    </div>
  )
}
