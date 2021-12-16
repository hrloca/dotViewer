import React, { useState } from 'react'
import { styled } from '@material-ui/system'
import { map, DotTarget } from '../../hooks/useDotSheet'
import { useAnimator } from '../../hooks/useAnimator'
import { DotDrawer } from '../DotDrawer'
import { Slider } from '../Slider'

import { animations } from '../../dots/animations'
import { Controller } from './Controller'
import { countup, countdown } from '../../libs'

type DotAnimatorProps = {
  src: string
  size: number
}

export const DotAnimator: React.FC<DotAnimatorProps> = ({ src, size }) => {
  const [anim, setAnim] = useState<number>(0)
  const [target, setTarget] = useState<number | undefined>(1)

  const { action, state, meta } = useAnimator(animations[anim], {
    onUpdate({ msec, values, meta }) {
      const [dotTargetNumber] = values
      action.seek(msec)
      setTarget(dotTargetNumber)
      if (msec === 0) {
        setTarget(meta.pause)
      }
    },
    onLoad({ pause }) {
      action.seek(0)
      setTarget(pause)
    },
  })

  const next = () => {
    setAnim(countup(animations.length - 1)(anim))
  }

  const prev = () => {
    if (state.time < 200) {
      setAnim(countdown(animations.length - 1)(anim))
    } else {
      action.seek(0)
    }
  }

  if (!meta || target === undefined) return null

  const reverse = target < 0
  const [y, x] = map[Math.abs(target) as DotTarget]
  const step = meta.totalTime / meta.frames
  const slow = () => {
    if (state.speed === 1) {
      action.speed(0.5)
    } else if (state.speed === 0.5) {
      action.speed(0.2)
    } else {
      action.speed(1)
    }
  }

  return (
    <Wrapper>
      <Display
        onClick={() => {
          if (state.isPlaying) {
            action.stop()
          } else {
            action.play()
          }
        }}
      >
        <div>{meta.name}</div>
        <div>{Math.round(meta.totalTime) / 1000}s</div>
        <DotDrawerView reverse={reverse} x={x} y={y} src={src} size={size} />
      </Display>

      <ControllerView>
        <SliderWrapper>
          <Slider
            onChange={(_, v) => {
              if (typeof v === 'number') {
                action.stop()
                action.seek(v)
              }
            }}
            onChangeCommitted={() => {
              action.play()
            }}
            defaultValue={0}
            step={step}
            value={state.time}
            min={0}
            max={meta.totalTime}
          />
        </SliderWrapper>

        <Controller
          isPlaying={state.isPlaying}
          isRepeat={state.isRepeat}
          speed={state.speed}
          onStop={() => action.stop()}
          onPlay={() => action.play()}
          onSlow={() => slow()}
          onPrev={prev}
          onNext={next}
          onRepeat={() => action.repeat(!state.isRepeat)}
          onFullScreen={() => null}
        />
      </ControllerView>
    </Wrapper>
  )
}

const DotDrawerView = styled(DotDrawer)({
  width: '100%',
})

const Display = styled('div')({
  position: 'relative',
  width: '100%',
  height: 300,
})

const Wrapper = styled('div')({
  position: 'relative',
  display: 'flex',
})

const SliderWrapper = styled('div')({
  paddingLeft: 16,
  paddingRight: 16,
})

const ControllerView = styled('div')({
  position: 'absolute',
  width: '100%',
  height: 48,
  bottom: 0,
})
