import React, { useEffect, useState } from 'react'
import { styled } from '@material-ui/system'
import { map, DotTarget } from '../../hooks/useDotSheet'
import { useAnimator } from '../../hooks/useAnimator'
import { DotDrawer } from '../DotDrawer'
import { Slider } from '../Slider'

import { animations } from '../../dots/animations'
import { Controller } from './Controller'

type DotAnimatorProps = {
  src: string
  size: number
}

export const DotAnimator: React.FC<DotAnimatorProps> = ({ src, size }) => {
  const [target, setTarget] = useState<number | undefined>(1)
  const [time, setTime] = useState<number | undefined>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [anim, setAnim] = useState<number>(0)

  const [player, meta] = useAnimator(animations[anim])

  useEffect(() => {
    player?.onChange((isplaying) => {
      setIsPlaying(isplaying)
    })

    player?.onUpdate(({ msec, values }) => {
      setTime(msec)
      setTarget(values[0])
    })
  }, [player])

  const reverse = typeof target === 'number' ? target < 0 : false
  const [y, x] = typeof target === 'number' ? map[Math.abs(target) as DotTarget] : [0, 1]

  if (!player || !meta) return null

  const onNext = () => {
    const ne = anim + 1
    if (ne >= animations.length) {
      setAnim(0)
      return
    }
    setAnim(ne)
  }

  return (
    <Wrapper>
      <Display
        onClick={() => {
          if (isPlaying) {
            player.stop()
          } else {
            player.play(true)
          }
        }}
      >
        <DotDrawerView reverse={reverse} x={x} y={y} src={src} size={size} />
      </Display>

      <ControllerView>
        <SliderWrapper>
          <Slider
            onChange={(_, v) => {
              if (typeof v === 'number') {
                player.seek(v)
              }
            }}
            defaultValue={0}
            step={meta.totalTime / meta.frames}
            value={time}
            min={0}
            max={meta.totalTime}
          />
        </SliderWrapper>

        <Controller
          isPlaying={isPlaying}
          onStop={() => player.stop()}
          onPlay={() => player.play(true)}
          onPrev={() => player.seek(0)}
          onNext={onNext}
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
  display: 'flex',
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
