import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import AddIcon from '@material-ui/icons/Add'

import { useManegeDots, useSelectorState } from '../state'
import { DotAnimator, DotDrawer, DotSelector, DotList } from './'

import Drawer from '@material-ui/core/SwipeableDrawer'
import Close from '@material-ui/icons/Close'
import List from '@material-ui/icons/FormatListBulleted'

export const Contents = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const { startSelectSheet } = useSelectorState()
  const { dots, setDot, removeDot } = useManegeDots()

  const [openModal, setOpenModal] = useState(false)
  const [imagePath, setImagePath] = useState(dots[0].src)
  const selectDot = (src: string, name: string) => {
    setDot({
      src,
      name,
      edit: true,
    })
  }

  const list = (
    <DotList
      onDelete={removeDot}
      onSelect={(i) => {
        setOpenModal(false)
        setImagePath(dots[i].src)
      }}
    />
  )

  return (
    <Container
      disableGutters
      sx={{ pt: { xs: 7, sm: 8 }, pb: { xs: 7, sm: 8, md: 0 } }}
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
          <DotDrawer size={32} src={dots[0].src} reverse={false} y={2} x={1} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dot Viewer
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              setOpenModal(true)
              startSelectSheet()
            }}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {!matches ? (
        <>
          <Box>
            <Grid container>
              <Grid item ml="auto">
                <IconButton onClick={() => setOpenModal(true)}>
                  <List />
                </IconButton>
              </Grid>
            </Grid>
            <DotAnimator size={128} src={imagePath} />
          </Box>
          <Drawer
            onOpen={() => console.log('onopen')}
            anchor="right"
            open={openModal}
            onClose={() => setOpenModal(false)}
          >
            <Grid container direction="column">
              <Grid item ml="auto">
                <IconButton onClick={() => setOpenModal(false)}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
            {list}
          </Drawer>
        </>
      ) : (
        <Grid container spacing={2} style={{ height: '100%', flexShrink: 0 }}>
          <Grid container direction="column" item xs={8}>
            <Box>
              <DotAnimator size={128} src={imagePath} />
            </Box>
          </Grid>
          <Grid style={{ height: '100%', flexShrink: 0 }} item xs={4}>
            <Box style={{ overflowY: 'scroll', height: '100%', flexShrink: 0 }}>
              {list}
            </Box>
          </Grid>
        </Grid>
      )}

      <DotSelector onSelect={selectDot} />
    </Container>
  )
}
