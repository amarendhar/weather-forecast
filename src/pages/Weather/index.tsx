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
    handleSelectWeather,
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
          <WeatherItemContainer role="tablist">
            {data?.list?.map((weather) => (
              <WeatherItem
                key={weather.dt}
                weather={weather}
                handleSelectWeather={handleSelectWeather}
                isSelected={weather.dt === selectedWeather?.dt}
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

  width: 100%;

  padding: ${({ theme }) => theme.space.lg}px;
`

const WeatherItemContainer = styled.div`
  position: relative;

  display: flex;
  grid-gap: ${({ theme }) => theme.space.md}px;

  width: 100%;
  overflow-x: auto;
  transform: translate3d(0, 0, 0);

  list-style: none;
  margin: 0;
  padding: 0;
  margin-block: 0;
  margin-inline: 0;
  padding-inline: 0;

  padding: ${({ theme }) => theme.space.lg}px;
  margin-top: ${({ theme }) => theme.space.lg}px;
`
