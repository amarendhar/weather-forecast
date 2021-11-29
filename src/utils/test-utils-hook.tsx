import { Provider } from 'react-redux'
import { store } from 'store'
import { renderHook as reactRenderHook } from '@testing-library/react-hooks'

const renderHook = (hook: any) => {
  const wrapper = ({ children }: { children: any }) => (
    <Provider store={store}>{children}</Provider>
  )

  return reactRenderHook(() => hook(), { wrapper })
}

// re-export everything
export * from '@testing-library/react-hooks'
// override renderHook method
export { renderHook }
