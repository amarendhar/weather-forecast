import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { fetchWeather, selectWeather, Weather } from 'store/slices/weatherSlice'

const useWeather = () => {
  const { status, error, data } = useAppSelector(selectWeather)
  const dispatch = useAppDispatch()
  const [selectedWeather, setSelectedWeather] = useState<
    null | Weather['list'][0]
  >(null)

  // Fetch on retry.
  const getWeather = useCallback(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  // Fetch on initial-mount.
  useEffect(() => {
    getWeather()
  }, [getWeather])

  useEffect(() => {
    setSelectedWeather(data?.list?.[0] || null)
  }, [data])

  const handleSelectedWeather = useCallback(
    (id) => {
      if (data.list.length) {
        setSelectedWeather(
          // Note: Usually the real API must be having `id` to be used instead of `dt`.
          data.list.find(({ dt }) => dt === id) as Weather['list'][0]
        )
      }
    },
    [data]
  )

  const { tempMax, tempMin } = useMemo(() => {
    let tempMax = 0
    let tempMin = 0

    if (data?.list?.length) {
      const tempList = data?.list.map((val) => {
        return val.main.temp
      })

      tempMax = Math.max(...tempList)
      tempMin = Math.min(...tempList)
    }

    return {
      tempMax,
      tempMin,
    }
  }, [data])

  return {
    status,
    error,
    data,
    getWeather,
    selectedWeather,
    handleSelectedWeather,
    tempMax,
    tempMin,
  }
}

export default useWeather
