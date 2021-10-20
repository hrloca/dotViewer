import React, { useState, useRef } from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import { injectGlobal } from '@emotion/css'
import { reset } from './css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { initializeState } from './initializeState'
import './manifest.json'

import { Slider } from './Slider'
import { AnimatorTimeKeeper, AnimatorFrame } from './Animator'
import Stop from '@material-ui/icons/StopCircle'
import Play from '@material-ui/icons/PlayCircle'
import Movie from '@material-ui/icons/Movie'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ec407a',
    },
    secondary: {
      main: '#66bb6a',
    },
  },
})

injectGlobal`
  ${reset}
  body, html {
    overflow: hidden;
    background-color: #fafafa;
  }
`
const AnimatorComponent = () => {
  const [f, setF] = useState(0)

  const frame = new AnimatorFrame({
    fps: 1,
    total: 10,
  })

  const totalTime = frame.totalTime

  const anim = useRef(
    new AnimatorTimeKeeper(totalTime, {
      onUpdate: (time) => {
        setF(time)
      },
      onEnd: () => {
        anim.seek(0)
      },
    })
  ).current

  return (
    <Container>
      <div>{`${Math.floor(f * 100) / 100}`}</div>
      <div>{frame.totalTime}</div>
      <IconButton onClick={() => anim.play()}>
        <Play />
      </IconButton>
      <IconButton onClick={() => anim.stop()}>
        <Stop />
      </IconButton>
      <IconButton onClick={() => (anim.speed = 1)}>
        <Movie />
      </IconButton>
      <IconButton onClick={() => (anim.speed = 2)}>
        <Movie />
      </IconButton>
      <IconButton onClick={() => (anim.speed = 4)}>
        <Movie />
      </IconButton>
      <IconButton onClick={() => anim.seek(0)}>
        <Movie />
      </IconButton>
      <Slider
        onChange={(_, v) => {
          if (typeof v === 'number') {
            if (anim.isPlaying) anim.stop()
            anim.seek(v)
          }
        }}
        defaultValue={0}
        step={1}
        value={f}
        min={0}
        max={totalTime}
      />
    </Container>
  )
}

const Root = () => {
  return (
    <RecoilRoot initializeState={initializeState}>
      <ThemeProvider theme={theme}>
        <AnimatorComponent />
      </ThemeProvider>
    </RecoilRoot>
  )
}

render(<Root />, document.getElementById('app'))
