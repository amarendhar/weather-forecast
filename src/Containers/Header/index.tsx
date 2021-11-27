import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <Container>
      <NavLink to="/" className="selected">
        Weather
      </NavLink>
    </Container>
  )
}

export default Header

const Container = styled.div`
  position: sticky;
  background-color: white;
  transition: width 300ms;
  z-index: 998;

  width: 100%;
  display: flex;
  justify-content: space-around;
  box-shadow: ${({ theme }) => theme.shadows.header};
`
