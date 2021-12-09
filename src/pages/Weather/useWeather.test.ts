import { renderHook, act } from 'utils/test-utils-hook'
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
      status: Status.PENDING,
      error: null,
      data: {},
      getWeather: expect.any(Function),
      selectedWeather: null,
      handleSelectWeather: expect.any(Function),
      tempMax: 0,
      tempMin: 0,
    })
  })

  it('Should fetch weather data from API', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useWeather())

    await waitForNextUpdate()

    expect(result.current).toEqual({
      status: Status.FULFILLED,
      error: null,
      data: mockWeather,
      getWeather: expect.any(Function),
      selectedWeather: mockWeather.list[0],
      handleSelectWeather: expect.any(Function),
      tempMax: 286.67,
      tempMin: 267.295,
    })
  })

  it('Should update selectedWeather', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useWeather())

    await waitForNextUpdate()

    expect(result.current.selectedWeather).toEqual(mockWeather.list[0])

    act(() => {
      result.current.handleSelectWeather(mockWeather.list[1].dt)
    })

    expect(result.current.selectedWeather).toEqual(mockWeather.list[1])
  })

  it('Should handle error-response from API', async () => {
    // Note: To mock error-responses, refer https://mswjs.io/docs/recipes/mocking-error-responses
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
        status: Status.REJECTED,
        error: 'Data not found',
        data: {},
        getWeather: expect.any(Function),
        selectedWeather: null,
        handleSelectWeather: expect.any(Function),
        tempMax: 0,
        tempMin: 0,
      })
    })
  })
})
