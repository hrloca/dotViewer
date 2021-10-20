import React, { FC, useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import StopCircleIcon from '@material-ui/icons/StopCircle'
import PlayCircleIcon from '@material-ui/icons/PlayCircle'

import { styled } from '@material-ui/core/styles'
import { DotAnimationCanvas } from './DotAnimationCanvas'
import { useDotAnimator } from './stateAnimate'
import { animations } from './animations'

interface DotDotViewerProps {
  src: string
}

const defaultSize = 96

export const DotViewer: FC<DotDotViewerProps> = ({ src }) => {
  const animator = useDotAnimator()
  const { action, state } = animator
  const initialAnimation = animations[2]
  const [size] = useState(defaultSize)

  useEffect(() => {
    action.use(initialAnimation)
    return () => {
      action.stop()
    }
  }, [])

  return (
    <>
      <Box sx={{ m: 1, height: 320 }}>
        <Canvas>
          <Box sx={{ position: 'relative', top: 20 }}>
            <DotAnimationCanvas
              initialAnimation={initialAnimation}
              animator={animator}
              size={size}
              src={src}
            />
          </Box>
          <Grid
            container
            sx={{
              justifyContent: 'right',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Grid item>
              <IconButton
                color="primary"
                onClick={() => {
                  if (state === 'stop') {
                    action.play()
                  } else {
                    action.stop()
                  }
                }}
              >
                {state === 'stop' ? <PlayCircleIcon /> : <StopCircleIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Canvas>
      </Box>
      <Box sx={{ height: 180, ml: 1, mr: 1, overflowY: 'scroll' }}>
        <Grid container spacing={1}>
          {animations.map((a) => {
            return (
              <Grid item xs={6} sm={3} key={a.name}>
                <Button
                  key={a.name}
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    action.use(a)
                    action.play()
                  }}
                >
                  {a.name}
                </Button>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

const Canvas = styled(Paper)(() => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
}))
