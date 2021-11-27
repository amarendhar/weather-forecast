import React from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import { Header, Footer } from 'Containers'
import { Home, NotFound } from 'pages'

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
