import React, { useState, useRef } from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import { injectGlobal } from '@emotion/css'
import { reset } from './css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { initializeState } from './initializeState'
import './manifest.json'

import { Slider } from './Slider'
import { AnimatorFactry, Animation } from './Animator'
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

const animation: Animation = {
  name: 'test',
  fps: 24,
  layers: [
    [
      {
        type: 'tween',
        startPoint: 1,
        endPoint: 5,
        from: 0,
        to: 100,
      },
      {
        type: 'tween',
        startPoint: 5,
        endPoint: 10,
        from: 100,
        to: 0,
      },
      {
        type: 'tween',
        startPoint: 10,
        endPoint: 20,
        from: 0,
        to: 300,
      },
    ],
    [
      {
        type: 'tween',
        startPoint: 1,
        endPoint: 5,
        from: 0,
        to: 10,
      },
      {
        type: 'tween',
        startPoint: 5,
        endPoint: 10,
        from: 10,
        to: 90,
      },
      {
        type: 'tween',
        startPoint: 10,
        endPoint: 20,
        from: 90,
        to: 300,
      },
    ],
  ],
}

const AnimatorComponent = () => {
  const [f, setF] = useState(0)
  const [x, setx] = useState<number | undefined>(0)
  const [y, sety] = useState<number | undefined>(0)
  const anim = useRef(
    new AnimatorFactry().create(animation, {
      onUpdate: ({ msec, values }) => {
        const [vx, vy] = values
        setx(vx)
        sety(vy)
        setF(msec)
      },
    })
  ).current

  return (
    <Container>
      {anim.totalTime}
      <IconButton onClick={() => anim.play()}>
        <Play />
      </IconButton>
      <IconButton onClick={() => anim.stop()}>
        <Stop />
      </IconButton>
      <IconButton onClick={() => anim.seek(0)}>
        <Movie />
      </IconButton>
      <div
        style={{
          transform: `translateX(${x}px) translateY(${y}px)`,
          width: 200,
          height: 200,
          background: '#faa',
        }}
      />
      <Slider
        onChange={(_, v) => {
          if (typeof v === 'number') {
            anim.stop()
            anim.seek(v)
          }
        }}
        defaultValue={0}
        step={1}
        value={f}
        min={0}
        max={anim.totalTime}
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
