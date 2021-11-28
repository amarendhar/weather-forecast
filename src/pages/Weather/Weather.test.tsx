import React from 'react'
import { render, screen, waitFor } from 'utils/test-utils'
import Weather from './index'
import mockWeather from 'mocks/mockWeather'

describe('Weather', () => {
  it('Should render loading-component initially', () => {
    render(<Weather />)

    screen.getByTestId('loading')
    expect(screen.queryByTestId('retry')).not.toBeInTheDocument()
    expect(screen.queryByTestId('weather-page')).not.toBeInTheDocument()
  })

  it('Should render with weather-list', async () => {
    render(<Weather />)

    screen.getByTestId('loading')

    await waitFor(() => {
      screen.getByTestId('weather-page')
    })

    expect(screen.getAllByTestId('weather-item').length).toEqual(
      mockWeather.list.length
    )
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('retry')).not.toBeInTheDocument()
  })
})
