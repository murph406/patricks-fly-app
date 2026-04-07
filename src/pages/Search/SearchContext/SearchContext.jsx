import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigationState } from '@react-navigation/native'
import { RECENTS_KEY } from '@utils/Vars'
import React from 'react'

const SearchContext = React.createContext(null)

export const SearchProvider = (props) => {
  const searchBarRef = React.useRef()
  const [recents, setRecents] = React.useState(null)

  const { routes } = useNavigationState(state => state)
  const { children } = props

  React.useEffect(() => {
    if (routes[0]?.state?.index === 2) {
      if (routes[0]?.state.routes[2].params?.focus) searchBarRef.current?.input?.focus()
    }
  }, [routes])

  React.useEffect(() => {
    const init = async () => {
      let res = await AsyncStorage.getItem(RECENTS_KEY)

      res = JSON.parse(res)
      if (res == null) res = []
      setRecents(res)
    }

    init()
  }, [])

  function addRecent(item) {
    const data = [...recents]
    const existIndex = data.findIndex((r) => r?.Id == item?.Id)
    const saveToStorage = async (copy) => {
      await AsyncStorage.setItem(RECENTS_KEY, JSON.stringify(copy))
    }

    if (existIndex) data.slice(existIndex, 1)
    data.push(item)

    if (data.length > 4) data.shift()
    setRecents(data)
    saveToStorage(data)
  }

  const value = {
    recents,
    addRecent,
    searchBarRef,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  return React.useContext(SearchContext)
}
