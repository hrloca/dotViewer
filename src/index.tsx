import React from 'react'
import { SafeAreaView } from 'react-native'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import { injectGlobal } from '@emotion/css'
import { reset } from './css'
import { Contents } from './Contents'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { initializeState } from './initializeState'
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
    background-color: #fafafa;
  }
`

const Root = () => {
  return (
    <RecoilRoot initializeState={initializeState}>
      <ThemeProvider theme={theme}>
        <SafeAreaView>
          <Contents />
        </SafeAreaView>
      </ThemeProvider>
    </RecoilRoot>
  )
}

render(<Root />, document.getElementById('app'))
