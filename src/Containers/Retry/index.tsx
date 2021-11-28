import React from 'react'
import styled from 'styled-components'

type RetryProps = {
  'data-testid'?: string
  onRetry?: () => void
}

// ToDo: Add test-cases
const Retry = ({ onRetry, ...restProps }: RetryProps) => {
  return (
    <Container data-testid={restProps['data-testid'] || 'retry'}>
      <div data-testid="retry-title">Something went wrong</div>
      <button data-testid="retry-button" onClick={onRetry}>
        Try Again
      </button>
    </Container>
  )
}

export default Retry

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: ${({ theme }) => theme.space.lg}px;
`
