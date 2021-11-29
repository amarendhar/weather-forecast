import { createGlobalStyle } from 'styled-components'
import { theme } from './ThemeProvider'

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  html, body, #root {
    font-family: roboto;
    min-height: 100vh;
  }

  #root {
    position: relative;
    padding-bottom: 40px;
    background-color: ${({ theme }) => theme.palette.primary.main};
  }

  //-------------------------------- Display helpers
  .h-overflow-hidden {
    overflow: hidden;
  }

  .h-sr-only {
    position: absolute;
    display: inline-block;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0px, 0px, 0px, 0px);
  }
`

export default GlobalStyle
