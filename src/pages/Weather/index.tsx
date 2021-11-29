import React from 'react'
import styled from 'styled-components'
import { Retry } from 'containers'
import { Loader } from 'components'
import { WeatherCloud, WeatherSun, WeatherRain } from 'components/Icons'
import useWeather from './useWeather'
import WeatherItem from './WeatherItem'
import WeatherReport from './WeatherReport'
import { Status } from 'types'

export const WeatherIcons = {
  Clear: WeatherSun,
  Clouds: WeatherCloud,
  Rain: WeatherRain,
}

const Weather = () => {
  const {
    status,
    error,
    data,
    getWeather,
    selectedWeather,
    handleSelectedWeather,
    tempMax,
    tempMin,
  } = useWeather()

  if (status === Status.PENDING) {
    return <Loader />
  }

  return (
    <Container data-testid="weather-page">
      {error ? (
        <Retry onRetry={getWeather} />
      ) : (
        <>
          {selectedWeather && (
            <WeatherReport
              selectedWeather={selectedWeather}
              city={data.city}
              tempMax={tempMax}
              tempMin={tempMin}
            />
          )}
          <WeatherItemContainer>
            {data?.list?.map((list) => (
              <WeatherItem
                key={list.dt}
                weather={list}
                handleSelectedWeather={handleSelectedWeather}
                isSelected={list.dt === selectedWeather?.dt}
              />
            ))}
          </WeatherItemContainer>
        </>
      )}
    </Container>
  )
}

export default Weather

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;

  padding: ${({ theme }) => theme.space.lg}px;
`

const WeatherItemContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;

  grid-gap: ${({ theme }) => theme.space.md}px;
  padding: ${({ theme }) => theme.space.lg}px;
  margin-top: ${({ theme }) => theme.space.lg}px;
`
