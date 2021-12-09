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
        <h3 data-testid="weather-report-temp">{kelvinToCelsius(temp)}&deg;</h3>
      </Temp>
      <City>
        <div data-testid="weather-report-city">{city.name}</div>
        <h3 data-testid="weather-report-date">
          <div>{moment(selectedWeather.dt_txt).format('dddd')}</div>
          <div>{moment(selectedWeather.dt_txt).format('DD. MMMM')}</div>
        </h3>
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
    grid-gap: ${({ theme }) => theme.space.lg}px;

    color: ${({ theme }) => theme.palette.text.dark};
  }

  > h3 {
    display: flex;
    flex: 1;
    align-items: center;

    margin: 0;

    font-size: 50px;
    font-weight: 700;
  }
`

const City = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div:first-child {
    color: ${({ theme }) => theme.palette.text.dark};
  }

  > h3 {
    margin: 0;

    font-size: 30px;
    font-weight: 700;
  }
`
