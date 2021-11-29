import React from 'react'
import { render, screen, waitFor } from 'utils/test-utils'
import { rest } from 'msw'
import { server } from 'mocks/server'
import Weather from './index'
import mockWeather from 'mocks/mockWeather'

/**
 * Note: jest.mock with jest.fn not working with react-scripts@4 which has jest@26 dependency,
 *  refer https://github.com/testing-library/react-testing-library/issues/663
 */
// jest.mock('./WeatherItem', () =>
//   jest.fn(() => <div data-testid="weather-item">weather-item</div>)
// )

describe('Weather', () => {
  it('Should render loading-component initially', () => {
    render(<Weather />)

    screen.getByTestId('loading')
    expect(screen.queryByTestId('retry')).not.toBeInTheDocument()
    expect(screen.queryByTestId('weather-page')).not.toBeInTheDocument()
  })

  it('Should render retry-component, when error-response received from API', async () => {
    // Note: To mock error-responses, refer https://mswjs.io/docs/recipes/mocking-error-responses
    server.use(
      rest.get('/weather', (req, res, ctx) => {
        return res(
          // Send a valid HTTP status code
          ctx.status(403),
          // And a response body, if necessary
          ctx.json({
            errorMessage: `Data not found`,
          })
        )
      })
    )

    render(<Weather />)

    await waitFor(() => {
      screen.getByTestId('retry')
    })

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('Should render weather-report', async () => {
    render(<Weather />)

    await waitFor(() => {
      screen.getByTestId('weather-page')
    })

    screen.getByTestId('weather-report')
  })

  it('Should render weather-items', async () => {
    render(<Weather />)

    await waitFor(() => {
      screen.getByTestId('weather-page')
    })

    expect(screen.getAllByTestId('weather-item').length).toEqual(
      mockWeather.list.length
    )
  })
})
