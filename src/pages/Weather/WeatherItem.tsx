import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Weather } from 'store/slices/weatherSlice'
import { WeatherIcons } from '.'
import kelvinToCelsius from 'utils/kelvinToCelsius'

type WeatherItemProps = {
  weather: Weather['list'][0]
  handleSelectedWeather: (id: number) => void
  isSelected: boolean
}

const WeatherItem = ({
  weather,
  handleSelectedWeather,
  isSelected,
}: WeatherItemProps) => {
  const Icon =
    WeatherIcons[weather.weather[0].main as keyof typeof WeatherIcons]

  return (
    <Container
      data-testid="weather-item"
      onClick={() => {
        handleSelectedWeather(weather.dt)
      }}
      isSelected={isSelected}
    >
      <Time>{moment(weather.dt_txt).format('HH:mm')}</Time>
      <div>
        <Icon width={50} height={50} />
      </div>
      <Temp>{kelvinToCelsius(weather.main.temp)}&deg;</Temp>
    </Container>
  )
}

export default WeatherItem

const Container = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  color: white;
  cursor: pointer;

  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.space.lg}px;
  grid-gap: ${({ theme }) => theme.space.lg}px;

  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.palette.primary.light : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`

const Time = styled.div`
  color: ${({ theme }) => theme.palette.text.dark};
`

const Temp = styled.div`
  font-size: 30px;
  font-weight: 700;
`
