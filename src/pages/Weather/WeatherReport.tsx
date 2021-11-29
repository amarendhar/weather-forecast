import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Weather } from 'store/slices/weatherSlice'
import { WeatherIcons } from '.'
import kelvinToCelsius from 'utils/kelvinToCelsius'

type WeatherReportProps = {
  selectedWeather: Weather['list'][0]
  city: Weather['city']
  tempMax: number
  tempMin: number
}

const WeatherReport = ({
  selectedWeather,
  city,
  tempMax,
  tempMin,
}: WeatherReportProps) => {
  const {
    weather: [{ main }],
    main: { temp },
  } = selectedWeather

  const Icon = WeatherIcons[main as keyof typeof WeatherIcons]

  return (
    <Container data-testid="weather-report">
      <div>
        <Icon width={100} height={100} />
      </div>
      <Temp>
        <div>
          <div data-testid="weather-report-main">{main}</div>
          <div data-testid="weather-report-temp-minmax">
            {kelvinToCelsius(tempMax)}&deg;&nbsp;/&nbsp;
            {kelvinToCelsius(tempMin)}&deg;
          </div>
        </div>
        <div data-testid="weather-report-temp">
          {kelvinToCelsius(temp)}&deg;
        </div>
      </Temp>
      <City>
        <div data-testid="weather-report-city">{city.name}</div>
        <div data-testid="weather-report-date">
          <div>{moment(selectedWeather.dt_txt).format('dddd')}</div>
          <div>{moment(selectedWeather.dt_txt).format('DD. MMMM')}</div>
        </div>
      </City>
    </Container>
  )
}

export default WeatherReport

const Container = styled.div`
  display: flex;
  color: white;

  grid-gap: ${({ theme }) => theme.space.lg}px;

  ${({ theme }) => theme.mediaQueries['<sm']} {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const Temp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:first-child {
    display: flex;
    color: ${({ theme }) => theme.palette.text.dark};

    grid-gap: ${({ theme }) => theme.space.lg}px;
  }

  > div:last-child {
    display: flex;
    flex: 1;
    align-items: center;

    font-weight: 700;
    font-size: 50px;
  }
`

const City = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div:first-child {
    color: ${({ theme }) => theme.palette.text.dark};
  }

  > div:last-child {
    font-weight: 700;
    font-size: 30px;
  }
`
