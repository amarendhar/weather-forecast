import mockWeather from 'mocks/mockWeather'
import kelvinToCelsius from './kelvinToCelsius'

describe('kelvinToCelsius', () => {
  it('Should convert kelvin to celsius', () => {
    expect(kelvinToCelsius(mockWeather.list[0].main.temp)).toEqual(14)
    expect(kelvinToCelsius(mockWeather.list[1].main.temp)).toEqual(13)
  })
})
