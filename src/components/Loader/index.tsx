import React from 'react'
import styled from 'styled-components'

type LoaderProps = {
  'data-testid'?: string
  children?: React.ReactNode
}

const Loader = ({ children, ...restProps }: LoaderProps) => {
  return (
    <Container
      data-testid={restProps['data-testid'] || 'loading'}
      {...restProps}
    >
      {children ? children : <Text>Loading...</Text>}
    </Container>
  )
}

export default Loader

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fill-available;

  color: white;
`

const Text = styled.h3`
  text-align: center;
`
