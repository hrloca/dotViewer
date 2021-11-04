import React, { useState, useRef } from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import { injectGlobal } from '@emotion/css'
import { reset } from './css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { initializeState } from './initializeState'
import './manifest.json'

import { Slider } from './Slider'
import { Animator } from './Animator'
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
  const [v, setv] = useState<number | undefined>(0)
  const anim = useRef(
    new Animator(
      {
        fps: 24,
        layer: [
          {
            type: 'tween',
            from: {
              target: 1,
              value: 0,
            },
            to: {
              target: 5,
              value: 100,
            },
          },
          {
            type: 'tween',
            from: {
              target: 10,
              value: 100,
            },
            to: {
              target: 20,
              value: 0,
            },
          },
        ],
      },
      {
        onUpdate: ({ msec, value }) => {
          console.log(value)
          setv(value)
          setF(msec)
        },
      }
    )
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
      {v ? (
        <div
          style={{
            transform: `translateY(${v}px)`,
            width: 200,
            height: 200,
            background: '#faa',
          }}
        />
      ) : null}
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
