import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import GlobalStyle from './GlobalStyles'

const space: Record<'sm' | 'md' | 'lg' | 'xl' | 'xxl', number> = {
  sm: 5,
  md: 10,
  lg: 15,
  xl: 20,
  xxl: 25,
}

const fontSizes: Record<'sm' | 'md' | 'lg' | 'xl' | 'xxl', number> = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
}

const fontWeights: Record<'regular' | 'bold', number> = {
  regular: 400,
  bold: 600,
}

const radii: Record<'sm' | 'md' | 'lg', number> = {
  sm: 3,
  md: 6,
  lg: 10,
}

const shadows: Record<'header' | 'box', string> = {
  header: '0 0 5px 0 black',
  box: '0px 3px 5px 0px rgb(0 0 0 / 20%)',
}

const palette: Record<
  'primary' | 'text',
  { main: string; dark: string; light: string }
> = {
  primary: {
    main: '#262a59',
    dark: '#3b3f69',
    light: '#51557a',
  },
  text: {
    main: '#000000',
    dark: '#a8aabd',
    light: '#ffffff',
  },
}

const breakpoints: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 600, // <= 600, Extra small devices (phones, 600px and down)
  sm: 600, // >= 600, Small devices (portrait tablets and large phones, 600px and up)
  md: 768, // >= 768, Medium devices (landscape tablets, 768px and up)
  lg: 992, // >= 1024, Large devices (laptops/desktops, 992px and up)
  xl: 1200, // >= 1200, Extra large devices (large laptops and desktops, 1200px and up)
}

export const mediaQueries: Record<
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '<xs'
  | '<sm'
  | '<md'
  | '<lg'
  | '<xl'
  | 'xsQuery'
  | 'smQuery'
  | 'mdQuery'
  | 'lgQuery'
  | 'xlQuery'
  | '<xsQuery'
  | '<smQuery'
  | '<mdQuery'
  | '<lgQuery'
  | '<xlQuery',
  string
> = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '<xs': `@media (max-width: ${breakpoints.xs}px)`,
  '<sm': `@media (max-width: ${breakpoints.sm}px)`,
  '<md': `@media (max-width: ${breakpoints.md}px)`,
  '<lg': `@media (max-width: ${breakpoints.lg}px)`,
  '<xl': `@media (max-width: ${breakpoints.xl}px)`,
  get xsQuery() {
    return this.xs.replace('@media', '')
  },
  get smQuery() {
    return this.sm.replace('@media', '')
  },
  get mdQuery() {
    return this.md.replace('@media', '')
  },
  get lgQuery() {
    return this.lg.replace('@media', '')
  },
  get xlQuery() {
    return this.xl.replace('@media', '')
  },
  get '<xsQuery'() {
    return this['<xs'].replace('@media', '')
  },
  get '<smQuery'() {
    return this['<sm'].replace('@media', '')
  },
  get '<mdQuery'() {
    return this['<md'].replace('@media', '')
  },
  get '<lgQuery'() {
    return this['<lg'].replace('@media', '')
  },
  get '<xlQuery'() {
    return this['<xl'].replace('@media', '')
  },
}

export const theme = {
  space,
  fontSizes,
  fontWeights,
  radii,
  shadows,
  palette,
  mediaQueries,
  breakpoints: Object.values(breakpoints),
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
)

export default ThemeProvider
