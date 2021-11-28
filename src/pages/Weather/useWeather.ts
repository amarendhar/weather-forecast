import { useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { fetchWeather, selectWeather } from 'store/slices/weatherSlice'

const useWeather = () => {
  const { status, error, data } = useAppSelector(selectWeather)
  const dispatch = useAppDispatch()

  // Callback to Fetch on retry.
  const getWeather = useCallback(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  // Fetch on initial-mount.
  useEffect(() => {
    getWeather()
  }, [getWeather])

  return {
    status,
    error,
    data,
    getWeather,
  }
}

export default useWeather
