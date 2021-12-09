import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <Container>
      <NavLinkContainer to="/" className="selected">
        Weather
      </NavLinkContainer>
    </Container>
  )
}

export default Header

const Container = styled.header`
  position: sticky;
  background-color: white;
  transition: width 300ms;
  z-index: 998;

  width: 100%;
  display: flex;
  justify-content: space-around;
  box-shadow: ${({ theme }) => theme.shadows.header};
`

const NavLinkContainer = styled(NavLink)`
  padding: ${({ theme }) => theme.space.md}px;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.main};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`
