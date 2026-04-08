import React from 'react'

const LayoutContext = React.createContext(null)
const LayoutDispatchContext = React.createContext(null)

const initialLayout = {
  loading: false,
  loadingMap: {},
}

const layoutReducer = (state, action) => {
  const shouldDisable = (map) => {
    const count = Object.keys(map).length
    const flag = count === 0
    return flag
  }

  switch (action.type) {
    case 'SET_LOADING_KEY': {
      const newLoadingMap = { ...state.loadingMap }
      newLoadingMap[action.key] = action?.value || true

      return {
        ...state,
        loadingMap: newLoadingMap,
        loading: !shouldDisable(newLoadingMap)
      }
    }
    case 'CLEAR_LOADING_KEY': {
      const newLoadingMap = { ...state.loadingMap }
      delete newLoadingMap[action.key]

      return {
        ...state,
        loadingMap: newLoadingMap,
        loading: !shouldDisable(newLoadingMap)
      }
    }
    case 'CLEAR_LOADING': {
      return {
        ...state,
        loadingMap: {}
      }
    }
    default:
      throw new Error('Unknown action: ' + action.type)
  }
}

export const LayoutProvider = ({ children }) => {
  const timeoutRef = React.useRef()
  const [state, dispatch] = React.useReducer(layoutReducer, initialLayout)
  const [loadingEnabled, setLoadingEnabled] = React.useState(false)

  React.useEffect(() => {
    if (state.loading) {
      clearTimeout(timeoutRef.current)
      setLoadingEnabled(state.loading)
    } else {
      timeoutRef.current = setTimeout(() => {
        setLoadingEnabled(state.loading)
      }, 750)
    }
  }, [state.loading])

  const value = {
    ...state,
    loading: loadingEnabled
  }

  return (
    <LayoutContext.Provider value={value}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return React.useContext(LayoutContext)
}

export function useLayoutDispatch() {
  return React.useContext(LayoutDispatchContext)
}
