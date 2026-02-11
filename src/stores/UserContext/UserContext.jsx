import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from "expo-splash-screen"

import { useAppState } from '@hooks/useAppState'

const UserContext = React.createContext(null)
const USER_LOCATION_KEY = "key:user:location"
const USER_NAVIGATION_STATE_KEY = 'key:navigation:state'

export const UserProvider = ({ children }) => {
  const active = useAppState()

  const [authenticated, setAuthenticated] = React.useState(null)
  const [initialNavigationState, setInitialNavigationState] = React.useState()

  React.useEffect(() => {

    const run = async () => {
      await setNavigationState()
      setAuthenticated(true)
      SplashScreen.hideAsync()
    }

    run()
  }, [])


  async function setNavigationState() {
    const savedStateString = await AsyncStorage.getItem(USER_NAVIGATION_STATE_KEY)
    let state

    state = savedStateString
      ? JSON.parse(savedStateString)
      : { routes: [{ name: 'main' }] }

    if (state !== undefined) setInitialNavigationState(state)
  }

  function saveNavigationState(state) {
    AsyncStorage.setItem(USER_NAVIGATION_STATE_KEY, JSON.stringify(state))
  }

  const value = {
    active,
    authenticated,
    initialNavigationState,
    saveNavigationState
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return React.useContext(UserContext)
}
