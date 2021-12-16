import React, { useEffect, useState } from 'react'
import { styled } from '@material-ui/system'
import { map, DotTarget } from '../../hooks/useDotSheet'
import { useAnimator } from '../../hooks/useAnimator'
import { DotDrawer } from '../DotDrawer'
import { Slider } from '../Slider'

import { animations } from '../../dots/animations'
import { Controller } from './Controller'
import { AspectRatio } from '../AspectRatio'
import { countup, countdown } from '../../libs'

type DotAnimatorProps = {
  src: string
  size: number
}

export const DotAnimator: React.FC<DotAnimatorProps> = ({ src, size }) => {
  const [anim, setAnim] = useState<number>(0)
  const [target, setTarget] = useState<number | undefined>(1)
  const [viewController, setViewController] = useState<boolean>(false)

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

  useEffect(() => {
    action.play()
    action.seek(0)
  }, [src])

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
    <Wrapper
      onMouseOver={() => setViewController(true)}
      onMouseOut={() => setViewController(false)}
    >
      <AspectRatio ratio={[3, 2]}>
        <TitleView show={viewController}>
          <div>{meta.name}</div>
        </TitleView>
        <Display
          onClick={() => {
            if (state.isPlaying) {
              action.stop()
            } else {
              action.play()
            }
          }}
        >
          <DotDrawer reverse={reverse} x={x} y={y} src={src} size={size} />
        </Display>

        <ControllerView show={viewController}>
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
          />
        </ControllerView>
      </AspectRatio>
    </Wrapper>
  )
}

const Display = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
})

const Wrapper = styled('div')({
  position: 'relative',
  display: 'flex',
})

const SliderWrapper = styled('div')({
  paddingLeft: 16,
  paddingRight: 16,
})

const ControllerView = styled('div')<{ show: boolean }>(({ show }) => {
  return {
    paddingTop: 8,
    paddingBottom: 8,
    position: 'absolute',
    transition: 'all .3s ease',
    opacity: show ? 1 : 0,
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  }
})

const TitleView = styled('div')<{ show: boolean }>(({ show }) => {
  return {
    padding: 8,
    position: 'absolute',
    transition: 'all .3s ease',
    opacity: show ? 1 : 0,
    width: '100%',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  }
})
