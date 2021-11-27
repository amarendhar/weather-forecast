import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { fetchWeather, selectWeather } from 'store/slices/weatherSlice'
import { Status } from 'types'

const Home = () => {
  const { status, data } = useAppSelector(selectWeather)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  if (status === Status.LOADING) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <div>
        {data?.list?.map(({ dt, weather }) => (
          <div key={dt}>{weather[0].description}</div>
        ))}
      </div>
    </Container>
  )
}

export default Home

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${({ theme }) => theme.space.lg}px;
`
