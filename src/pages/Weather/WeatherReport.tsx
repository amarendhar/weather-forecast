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
    weather: [weather],
    main: { temp },
  } = selectedWeather

  const Icon = WeatherIcons[weather.main as keyof typeof WeatherIcons]

  return (
    <Stats>
      <div>
        <Icon width={100} height={100} />
      </div>
      <Temp>
        <div>
          <div>{weather.main}</div>
          <div>
            {kelvinToCelsius(tempMax)}&deg;&nbsp;/&nbsp;
            {kelvinToCelsius(tempMin)}&deg;
          </div>
        </div>
        <div>{kelvinToCelsius(temp)}&deg;</div>
      </Temp>
      <City>
        <div>{city.name}</div>
        <div>
          <div>{moment(selectedWeather.dt_txt).format('dddd')}</div>
          <div>{moment(selectedWeather.dt_txt).format('DD. MMMM')}</div>
        </div>
      </City>
    </Stats>
  )
}

export default WeatherReport

const Stats = styled.div`
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
