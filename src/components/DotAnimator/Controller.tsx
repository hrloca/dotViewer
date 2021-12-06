import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Stop from '@material-ui/icons/StopSharp'
import Play from '@material-ui/icons/PlayArrow'
import SkipPrev from '@material-ui/icons/SkipPrevious'
import SkipNext from '@material-ui/icons/SkipNext'
import Fullscreen from '@material-ui/icons/Fullscreen'

type ControllerProps = {
  onPlay: () => void
  onStop: () => void
  onPrev: () => void
  onNext: () => void
  onFullScreen: () => void
  isPlaying: boolean
}

export const Controller: React.FC<ControllerProps> = ({
  onPlay,
  onStop,
  onPrev,
  onNext,
  onFullScreen,
  isPlaying,
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
      <IconButton onClick={() => onFullScreen()}>
        <Fullscreen />
      </IconButton>
    </>
  )
}
