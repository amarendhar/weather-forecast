import mockWeather from 'mocks/mockWeather'
import { Status } from 'types'
import weatherReducer, {
  WeatherState,
  Weather,
  fetchWeather,
} from './weatherSlice'

describe('weather reducer', () => {
  const initialState: WeatherState = {
    data: {} as Weather,
    status: Status.IDLE,
    error: null,
  }

  it('Should handle initial-state', () => {
    expect(weatherReducer(undefined, { type: 'unknown' })).toEqual({
      data: {},
      status: Status.IDLE,
      error: null,
    })
  })

  it('Should handle pending', () => {
    const actual = weatherReducer(initialState, {
      type: fetchWeather.pending,
    })

    expect(actual).toEqual({
      data: {},
      status: Status.PENDING,
      error: null,
    })
  })

  it('Should handle fulfilled', () => {
    const actual = weatherReducer(initialState, {
      type: fetchWeather.fulfilled,
      payload: mockWeather,
    })

    expect(actual).toEqual({
      data: mockWeather,
      status: Status.FULFILLED,
      error: null,
    })
  })

  it('Should handle rejected', () => {
    const error = new Error('Data not found')

    const actual = weatherReducer(initialState, {
      type: fetchWeather.rejected,
      payload: error.message,
    })

    expect(actual).toEqual({
      data: {},
      status: Status.REJECTED,
      error: 'Data not found',
    })
  })
})
