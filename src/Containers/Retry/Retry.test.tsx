import React from 'react'
import { screen, render } from '@testing-library/react'
import ThemeProvider from 'themes/ThemeProvider'
import { Retry } from 'containers'

describe('Retry', () => {
  const commonProps = {
    onRetry: jest.fn(),
  }

  const renderComponent = (customPros = {}) => {
    const props = { ...commonProps, customPros }

    render(
      <ThemeProvider>
        <Retry {...props} />
      </ThemeProvider>
    )
  }

  it('Should render retry-component with text & button', () => {
    renderComponent()

    screen.getByTestId('retry')
    expect(screen.getByTestId('retry-title').textContent).toEqual(
      'Something went wrong'
    )
    expect(screen.getByTestId('retry-button').textContent).toEqual('Try Again')
  })

  it('Should invoke onRetry-callback, onClick of retry-button ', () => {
    renderComponent()

    screen.getByTestId('retry-button').click()
    expect(commonProps.onRetry).toHaveBeenCalled()
  })
})
