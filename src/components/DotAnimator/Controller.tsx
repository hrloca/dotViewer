import React from 'react'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Stop from '@material-ui/icons/StopSharp'
import Play from '@material-ui/icons/PlayArrow'
import SkipPrev from '@material-ui/icons/SkipPrevious'
import SkipNext from '@material-ui/icons/SkipNext'
import Fullscreen from '@material-ui/icons/Fullscreen'
import SlowMotionVideo from '@material-ui/icons/SlowMotionVideo'
import Repeat from '@material-ui/icons/Repeat'

type ControllerProps = {
  onPlay: () => void
  onStop: () => void
  onPrev: () => void
  onNext: () => void
  onSlow: () => void
  onRepeat: () => void
  onFullScreen: () => void
  isPlaying: boolean
  isRepeat: boolean
  speed: number
}

export const Controller: React.FC<ControllerProps> = ({
  onPlay,
  onStop,
  onPrev,
  onNext,
  onSlow,
  onRepeat,
  onFullScreen,
  isPlaying,
  isRepeat,
  speed,
}) => {
  const onClickPlayOrStop = isPlaying ? onStop : onPlay
  const OnClickPlayOrStopIcon = isPlaying ? Stop : Play

  return (
    <>
      <IconButton onClick={() => onClickPlayOrStop()}>
        <OnClickPlayOrStopIcon />
      </IconButton>
      <IconButton onClick={() => onPrev()}>
        <SkipPrev />
      </IconButton>
      <IconButton onClick={() => onNext()}>
        <SkipNext />
      </IconButton>
      <IconButton onClick={() => onRepeat()}>
        <Repeat color={isRepeat ? 'primary' : undefined} />
      </IconButton>
      <Button
        onClick={() => onSlow()}
        variant="contained"
        color={speed === 1 ? 'inherit' : undefined}
        startIcon={<SlowMotionVideo />}
      >
        ×{speed}
      </Button>
      <IconButton onClick={() => onFullScreen()}>
        <Fullscreen />
      </IconButton>
    </>
  )
}
