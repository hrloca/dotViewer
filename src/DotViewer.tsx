import React, { FC, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { styled } from '@material-ui/core/styles'

import { DotDrawer } from './DotDrawer'
import { animations } from './animations'
import { useDotAnimate } from './stateAnimate'

interface DotDotViewerProps {
  imgPath: string
  size: number
}

export const DotViewer: FC<DotDotViewerProps> = ({ size, imgPath }) => {
  const { animator, frame } = useDotAnimate()
  if (!animator) return null

  useEffect(() => {
    animator.use(animations[0]).start()
  }, [])

  if (!frame) return null

  const [x, y] = frame

  return (
    <>
      <Box sx={{ m: 1, height: 320 }}>
        <Canvas>
          <DotDrawer size={size} imgPath={imgPath} reverse={false} x={x} y={y} />
        </Canvas>
      </Box>
      <Box sx={{ ml: 1, mr: 1, overflowY: 'scroll' }}>
        <Grid container spacing={1}>
          {animations.map((a) => {
            return (
              <Grid item xs={6} sm={3} key={a.name}>
                <Button
                  key={a.name}
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    animator.use(a).start()
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
