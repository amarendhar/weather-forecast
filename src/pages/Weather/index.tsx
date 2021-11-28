import React from 'react'
import styled from 'styled-components'
import { Loader } from 'components'
import { Status } from 'types'
import { Retry } from 'containers'
import useWeather from './useWeather'
import WeatherItem from './WeatherItem'

const Weather = () => {
  const { status, error, data, getWeather } = useWeather()

  if (status === Status.PENDING) {
    return <Loader />
  }

  return (
    <Container data-testid="weather-page">
      {error ? (
        <Retry onRetry={getWeather} />
      ) : (
        <WeatherItemContainer>
          {data?.list?.map(({ dt, weather }) => (
            <WeatherItem key={dt} dt={dt} weather={weather} />
          ))}
        </WeatherItemContainer>
      )}
    </Container>
  )
}

export default Weather

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${({ theme }) => theme.space.lg}px;
`

const WeatherItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  grid-gap: ${({ theme }) => theme.space.md}px;
`
