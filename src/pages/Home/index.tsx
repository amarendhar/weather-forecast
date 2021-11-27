import React from 'react'
import styled from 'styled-components'

const Home = () => {
  return (
    <Container>
      <div>Weather</div>
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
