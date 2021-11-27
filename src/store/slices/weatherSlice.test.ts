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
    status: Status.IDEAL,
  }

  it('Should handle initial state', () => {
    expect(weatherReducer(undefined, { type: 'unknown' })).toEqual({
      data: {},
      status: 'idle',
    })
  })

  it('Should handle loading', () => {
    const actual = weatherReducer(initialState, {
      type: fetchWeather.pending,
    })

    expect(actual).toEqual({
      data: {},
      status: Status.LOADING,
    })
  })

  it('Should handle fulfilled', () => {
    const actual = weatherReducer(initialState, {
      type: fetchWeather.fulfilled,
      payload: mockWeather,
    })

    expect(actual).toEqual({
      data: mockWeather,
      status: Status.IDEAL,
    })
  })

  it('Should handle rejected', () => {
    const actual = weatherReducer(initialState, {
      type: fetchWeather.rejected,
      payload: mockWeather,
    })

    expect(actual).toEqual({
      data: {},
      status: Status.FAILED,
    })
  })
})
