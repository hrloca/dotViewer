import React from 'react'
import { SafeAreaView } from 'react-native'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import { injectGlobal } from '@emotion/css'
import { reset } from './css'
import { DotViewer } from './DotViewer'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { initializeState } from './stateDots'
import './manifest.json'

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
  }
`

const Root = () => {
  return (
    <RecoilRoot initializeState={initializeState}>
      <ThemeProvider theme={theme}>
        <SafeAreaView>
          <DotViewer />
        </SafeAreaView>
      </ThemeProvider>
    </RecoilRoot>
  )
}

render(<Root />, document.getElementById('app'))
