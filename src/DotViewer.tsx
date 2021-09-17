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

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies'
import AddIcon from '@material-ui/icons/Add'
import { useSelectorState } from './stateSelector'
import { useManegeDots } from './stateDots'

const defaultSize = 128

export const DotViewer = () => {
  const { startSelectSheet } = useSelectorState()
  const { dots, setDot, removeDot } = useManegeDots()

  const [size, setSize] = useState(defaultSize)
  const [motIndex, setMotIndex] = useState(3)
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
    <Box sx={{ pb: 7 }}>
      <AppBar position="static">
        <Toolbar>
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
        <CarouselItem>
          <div>
            <div>
              <div>
                <DotCanvas size={size} imgPath={imagePath} index={motIndex} />
              </div>
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
            </div>

            <div>
              <div>
                {animations.map((motion, i) => {
                  return (
                    <div key={motion.name}>
                      <Button variant="contained" onClick={() => setMotIndex(i)}>
                        {motion.name}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem>
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
