import { renderHook } from 'utils/test-utils-hook'
import { rest } from 'msw'
import { server } from 'mocks/server'
import mockWeather from 'mocks/mockWeather'
import useWeather from './useWeather'
import { Status } from 'types'
import { waitFor } from '@testing-library/dom'

describe('useWeather', () => {
  it('Should return initial state', () => {
    const { result } = renderHook(() => useWeather())

    expect(result.current).toEqual({
      data: {},
      error: null,
      status: Status.PENDING,
      getWeather: expect.any(Function),
    })
  })

  it('Should fetch weather data from API', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useWeather())

    await waitForNextUpdate()

    expect(result.current).toEqual({
      data: mockWeather,
      error: null,
      status: Status.FULFILLED,
      getWeather: expect.any(Function),
    })
  })

  it('Should handle error-response from API', async () => {
    server.use(
      rest.get('/weather', (req, res, ctx) => {
        return res(
          // Send a valid HTTP status code
          ctx.status(403),
          // And a response body, if necessary
          ctx.json({
            errorMessage: `Data not found`,
          })
        )
      })
    )
    const { result, waitForNextUpdate } = renderHook(() => useWeather())

    await waitForNextUpdate()

    await waitFor(() => {
      expect(result.current).toEqual({
        data: {},
        error: 'Data not found',
        status: Status.REJECTED,
        getWeather: expect.any(Function),
      })
    })
  })
})
