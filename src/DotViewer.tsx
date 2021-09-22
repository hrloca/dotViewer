import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { Carousel, CarouselItem, useIndex } from '@hrloca/swipii'

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { styled, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies'
import AddIcon from '@material-ui/icons/Add'

import { useSelectorState } from './stateSelector'
import { useManegeDots } from './stateDots'
import { DotDrawer } from './DotDrawer'
import { DotCanvas } from './DotCanvas'
import { animations } from './animations'
import { DotSelector } from './DotSelector'
import { DotList } from './DotList'

const defaultSize = 128

export const DotViewer = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const { startSelectSheet } = useSelectorState()
  const { dots, setDot, removeDot } = useManegeDots()

  const [size] = useState(defaultSize)
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

  const actionList = animations.map((motion, i) => {
    return (
      <Button
        key={motion.name}
        fullWidth
        variant="contained"
        onClick={() => setMotIndex(i)}
      >
        {motion.name}
      </Button>
    )
  })

  const display = (
    <Canvas>
      <DotCanvas size={size} imgPath={imagePath} index={motIndex} />
    </Canvas>
  )

  const viewer = (
    <>
      <Box sx={{ m: 1, height: 320 }}>{display}</Box>
      <Box sx={{ ml: 1, mr: 1, overflowY: 'scroll' }}>
        <Grid container spacing={1}>
          {actionList.map((action, i) => {
            return (
              <Grid item xs={6} sm={3} key={i}>
                {action}
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </>
  )

  const list = (
    <DotList
      onDelete={removeDot}
      onSelect={(i) => {
        setIndex(0)
        setImagePath(dots[i].src)
      }}
    />
  )

  useEffect(() => {
    if (matches) {
      setIndex(0)
    }
  }, [matches])

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ pt: { xs: 7, sm: 8 } }}
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <AppBar>
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

      {!matches ? (
        <>
          <Carousel length={length} index={index} onNext={next} onPrev={prev}>
            <CarouselItem
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 112px)',
              }}
            >
              {viewer}
            </CarouselItem>
            <CarouselItem style={{ overflowY: 'scroll', height: 'calc(100vh - 112px)' }}>
              {list}
            </CarouselItem>
          </Carousel>

          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <SafeAreaView>
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
            </SafeAreaView>
          </Paper>
        </>
      ) : (
        <>
          <Grid container spacing={2} style={{ height: '100%', flexShrink: 0 }}>
            <Grid container direction="column" item xs={8}>
              <Grid item m={1} style={{ height: 320 }}>
                {display}
              </Grid>
              <Grid sx={{ ml: 1, mr: 1, overflowY: 'scroll' }}>
                <Grid container spacing={1}>
                  {actionList.map((action, i) => {
                    return (
                      <Grid item md={3} key={i}>
                        {action}
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
            <Grid style={{ height: '100%', flexShrink: 0 }} item xs={4}>
              <Box style={{ overflowY: 'scroll', height: '100%', flexShrink: 0 }}>
                {list}
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      <DotSelector onSelect={selectDot} />
    </Container>
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
