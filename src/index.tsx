import React from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import { injectGlobal } from '@emotion/css'
import { reset } from './css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { initializeState } from './state'
import './manifest.json'

import { App } from './components'

const theme = createTheme({
  palette: {
    primary: {
      main: '#eee',
    },
    secondary: {
      main: '#66bb6a',
    },
  },
})

injectGlobal`
  ${reset}
  body, html {
    background-color: #fafafa;
  }
`

const Root = () => {
  return (
    <RecoilRoot initializeState={initializeState}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  )
}

render(<Root />, document.getElementById('app'))
