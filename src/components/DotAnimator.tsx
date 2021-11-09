import React, { useState } from 'react'
import { map, DotTarget } from './../hooks/useDotSheet'
import { useAnimator } from './../hooks/useAnimator'
import { DotDrawer } from './DotDrawer'
import { Slider } from './Slider'

import Stop from '@material-ui/icons/StopCircle'
import Play from '@material-ui/icons/PlayCircle'
import SkipPrev from '@material-ui/icons/SkipPrevious'
import SkipNext from '@material-ui/icons/SkipNext'
import IconButton from '@material-ui/core/IconButton'

import { animations } from '../dotAnimations/index'

type DotAnimatorProps = {
  src: string
}

export const DotAnimator: React.FC<DotAnimatorProps> = ({ src }) => {
  const [target, setTarget] = useState<number | undefined>(1)
  const [time, setTime] = useState<number | undefined>(1)

  const player = useAnimator(animations[2], {
    onUpdate({ msec, values }) {
      setTime(msec)
      setTarget(values[0])
    },
  })

  const reverse = typeof target === 'number' ? target < 0 : false
  const [y, x] = typeof target === 'number' ? map[Math.abs(target) as DotTarget] : [0, 1]

  if (!player) return null

  return (
    <>
      <IconButton onClick={() => player.play(true)}>
        <Play />
      </IconButton>
      <IconButton onClick={() => player.stop()}>
        <Stop />
      </IconButton>
      <IconButton
        onClick={() => {
          player.seek(0)
        }}
      >
        <SkipPrev />
      </IconButton>
      <IconButton>
        <SkipNext />
      </IconButton>
      <DotDrawer reverse={reverse} x={x} y={y} src={src} size={64} />
      <Slider
        onChange={(_, v) => {
          if (typeof v === 'number') {
            if (player.isPlaying) player.stop()
            player.seek(v)
          }
        }}
        defaultValue={0}
        step={player.totalTime / player.totalFrame}
        value={time}
        min={0}
        max={player.totalTime}
      />
    </>
  )
}
