import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100vh;
  }

  #root {
    position: relative;
    padding-bottom: 40px;
  }

  //-------------------------------- Display helpers
  .h-overflow-hidden {
    overflow: hidden;
  }
`

export default GlobalStyle
