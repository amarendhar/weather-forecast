import { rest } from 'msw'
import mockWeather from 'mocks/mockWeather'

/**
 * To mock error-responses, refer https://mswjs.io/docs/recipes/mocking-error-responses
 */
export const handlers = [
  rest.get('/weather', (req, res, ctx) => {
    return res(ctx.json(mockWeather), ctx.delay(150))
  }),
]
