import React from 'react'
import { screen, render } from '@testing-library/react'
import { Loader } from 'components'

describe('Loader', () => {
  it('Should render text Loading..., when no children passed', () => {
    render(<Loader />)

    expect(screen.getByTestId('loading').textContent).toEqual('Loading...')
  })

  it('Should render children, when children passed', () => {
    render(
      <Loader>
        <div data-testid="loading-children">Loading Component</div>
      </Loader>
    )

    expect(screen.getByTestId('loading-children').textContent).toEqual(
      'Loading Component'
    )
  })
})
