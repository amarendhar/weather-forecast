import React from 'react'
import { render, screen } from 'utils/test-utils'
import 'jest-styled-components'
import WeatherItem from './WeatherItem'
import mockWeather from 'mocks/mockWeather'
import { theme } from 'themes/ThemeProvider'

describe('WeatherItem', () => {
  const commonProps = {
    weather: mockWeather.list[0],
    handleSelectedWeather: jest.fn(),
    isSelected: false,
  }

  const renderComponent = (customProps = {}) => {
    const props = { ...commonProps, ...customProps }

    return render(<WeatherItem {...props} />)
  }

  it('Should render with time, icon & temperature', () => {
    renderComponent()

    screen.getByTestId('weather-item')
    screen.getByTestId('icon-weather-sun')
    expect(screen.getByTestId('weather-item-time').textContent).toEqual('12:00')
    expect(screen.getByTestId('weather-item-temp').textContent).toEqual('14°')
    expect(screen.getByTestId('weather-item')).toHaveStyleRule(
      'background-color',
      'transparent'
    )
  })

  it('Should render with cloud-icon', () => {
    renderComponent({ weather: mockWeather.list[4] })

    screen.getByTestId('icon-weather-cloud')
  })

  it('Should render with rain-icon', () => {
    renderComponent({ weather: mockWeather.list[5] })

    screen.getByTestId('icon-weather-rain')
  })

  it('Should render selected state', () => {
    renderComponent({ isSelected: true })

    expect(screen.getByTestId('weather-item')).toHaveStyleRule(
      'background-color',
      theme.palette.primary.light
    )
  })

  it('Should invoke handleSelectedWeather with selected-id onClick', () => {
    renderComponent()

    screen.getByTestId('weather-item').click()
    expect(commonProps.handleSelectedWeather).toHaveBeenCalledWith(
      commonProps.weather.dt
    )
  })
})
