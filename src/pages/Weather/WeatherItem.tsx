import React from 'react'
import styled from 'styled-components'
import { Weather } from 'store/slices/weatherSlice'

type WeatherItemProps = {
  dt: Weather['list'][0]['dt']
  weather: Weather['list'][0]['weather']
}

const WeatherItem = ({ weather }: WeatherItemProps) => {
  return (
    <Container data-testid="weather-item">{weather[0].description}</Container>
  )
}

export default WeatherItem

const Container = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`
