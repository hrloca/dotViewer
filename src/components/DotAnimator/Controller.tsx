import React from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Stop from '@material-ui/icons/StopSharp'
import Play from '@material-ui/icons/PlayArrow'
import SkipPrev from '@material-ui/icons/SkipPrevious'
import SkipNext from '@material-ui/icons/SkipNext'
import SlowMotionVideo from '@material-ui/icons/SlowMotionVideo'
import Repeat from '@material-ui/icons/Repeat'

type ControllerProps = {
  onPlay: () => void
  onStop: () => void
  onPrev: () => void
  onNext: () => void
  onSlow: () => void
  onRepeat: () => void
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
  isPlaying,
  isRepeat,
  speed,
}) => {
  const onClickPlayOrStop = isPlaying ? onStop : onPlay
  const OnClickPlayOrStopIcon = isPlaying ? Stop : Play

  return (
    <Grid container spacing={1}>
      <Grid item>
        <IconButton onClick={() => onClickPlayOrStop()}>
          <OnClickPlayOrStopIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton onClick={() => onPrev()}>
          <SkipPrev />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={() => onNext()}>
          <SkipNext />
        </IconButton>
      </Grid>

      <Grid item>
        <Button
          onClick={() => onSlow()}
          variant="contained"
          color={speed === 1 ? 'inherit' : undefined}
          startIcon={<SlowMotionVideo />}
        >
          ×{speed}
        </Button>
      </Grid>

      <Grid item>
        <IconButton onClick={() => onRepeat()}>
          <Repeat color={isRepeat ? 'primary' : undefined} />
        </IconButton>
      </Grid>
    </Grid>
  )
}
