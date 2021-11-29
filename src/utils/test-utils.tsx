import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from 'store'
import ThemeProvider from 'themes/ThemeProvider'
import App from 'App'

const render = (
  ui: React.ReactElement,
  {
    route = '',
    // @ts-ignore
    preloadedState = {},
    // @ts-ignore
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) => {
  const history = createMemoryHistory({ initialEntries: [route] })

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider>{route ? <App /> : children}</ThemeProvider>
        </Router>
      </Provider>
    )
  }

  return {
    ...rtlRender(ui as React.ReactElement, {
      // @ts-ignore
      wrapper: Wrapper,
      ...renderOptions,
    }),
    history,
  }
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
