import React from 'react'
import { render, screen } from 'utils/test-utils'
import WeatherReport from './WeatherReport'
import mockWeather from 'mocks/mockWeather'

describe('WeatherReport', () => {
  const commonProps = {
    selectedWeather: mockWeather.list[0],
    city: mockWeather.city,
    tempMax: 0,
    tempMin: 0,
  }

  const renderComponent = (customProps = {}) => {
    const props = { ...commonProps, ...customProps }

    return render(<WeatherReport {...props} />)
  }

  it('Should render with icon, temperature, city & date', () => {
    renderComponent()

    screen.getByTestId('weather-report')
    screen.getByTestId('icon-weather-sun')
    expect(screen.getByTestId('weather-report-main').textContent).toEqual(
      'Clear'
    )
    expect(
      screen.getByTestId('weather-report-temp-minmax').textContent
    ).toEqual('-273° / -273°')
    expect(screen.getByTestId('weather-report-temp').textContent).toEqual('14°')
    expect(screen.getByTestId('weather-report-city').textContent).toEqual(
      'Altstadt'
    )
    expect(screen.getByTestId('weather-report-date').textContent).toEqual(
      'Thursday16. February'
    )
  })

  it('Should render with cloud-icon', () => {
    renderComponent({ selectedWeather: mockWeather.list[4] })

    screen.getByTestId('icon-weather-cloud')
  })

  it('Should render with rain-icon', () => {
    renderComponent({ selectedWeather: mockWeather.list[5] })

    screen.getByTestId('icon-weather-rain')
  })
})
