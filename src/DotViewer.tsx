import React, { useState } from 'react'
import { DotCanvas } from './DotCanvas'
import { animations } from './animations'
import { DotSelector } from './DotSelector'
import { DotList } from './DotList'
import { Carousel, CarouselItem, useIndex } from '@hrloca/swipii'

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import { styled } from '@material-ui/core/styles'

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies'
import AddIcon from '@material-ui/icons/Add'

import { useSelectorState } from './stateSelector'
import { useManegeDots } from './stateDots'
import { DotDrawer } from './DotDrawer'

const defaultSize = 128

export const DotViewer = () => {
  const { startSelectSheet } = useSelectorState()
  const { dots, setDot, removeDot } = useManegeDots()

  const [size, setSize] = useState(defaultSize)
  const [motIndex, setMotIndex] = useState(0)
  const [imagePath, setImagePath] = useState(dots[0].src)
  const { setIndex, length, index, next, prev } = useIndex(2, 0)

  const selectDot = (src: string, name: string) => {
    setDot({
      src,
      name,
      edit: true,
    })
  }

  return (
    <Box sx={{ pt: 7, pb: 7 }}>
      <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <Toolbar>
          <DotDrawer size={32} imgPath={dots[0].src} reverse={false} y={2} x={1} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dot Viewer
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              setIndex(1)
              startSelectSheet()
            }}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Carousel length={length} index={index} onNext={next} onPrev={prev}>
        <CarouselItem
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 112px)',
          }}
        >
          <Box sx={{ m: 1 }}>
            <Display elevation={3}>
              <Canvas>
                <DotCanvas size={size} imgPath={imagePath} index={motIndex} />
              </Canvas>
              <Slider
                orientation="vertical"
                valueLabelDisplay="auto"
                defaultValue={defaultSize}
                step={64}
                min={64}
                max={256}
                onChange={(_, val) => setSize(val as number)}
                marks
              />
            </Display>
          </Box>
          <Box sx={{ m: 1, overflowY: 'scroll' }}>
            <Grid container spacing={1}>
              {animations.map((motion, i) => {
                return (
                  <Grid item xs={6} md={3} key={motion.name}>
                    <Button fullWidth variant="contained" onClick={() => setMotIndex(i)}>
                      {motion.name}
                    </Button>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </CarouselItem>

        <CarouselItem style={{ overflowY: 'scroll', height: 'calc(100vh - 112px)' }}>
          <DotList
            onDelete={removeDot}
            onSelect={(i) => {
              setIndex(0)
              setImagePath(dots[i].src)
            }}
          />
        </CarouselItem>
      </Carousel>

      <DotSelector onSelect={selectDot} />

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={index}
          onChange={(_, newValue) => {
            setIndex(newValue)
          }}
        >
          <BottomNavigationAction label="view" icon={<LocalMoviesIcon />} />
          <BottomNavigationAction label="dots" icon={<FormatListBulletedIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

const Display = styled(Paper)(() => ({
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  height: 320,
}))

const Canvas = styled('div')(() => ({
  display: 'flex',
  width: 320,
  height: 320,
}))
