import React from 'react'

import { Alert, Linking, Platform } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from "expo-constants"
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from "expo-splash-screen"

import { sendNotification, writePushToken } from '@api/notifications'
import { useAppState } from '@hooks/useAppState'
import { USER_DEVELOPER_KEY, USER_NAVIGATION_STATE_KEY, USER_PUSH_NOTIFICATION_KEY } from '@utils/Vars'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const UserContext = React.createContext(null)

export const UserProvider = ({ children }) => {
  const active = useAppState()

  const [location, setLocation] = React.useState(null)
  const [isDeveloper, setIsDeveloper] = React.useState(false)
  const [authenticated, setAuthenticated] = React.useState(null)
  const [initialNavigationState, setInitialNavigationState] = React.useState(null)
  const [notificationToken, setNotificationToken] = React.useState(null)
  const [locationPermissionStatus, setLocationPermissionStatus] = React.useState(null)
  const [notificationPermissionStatus, setNotificationPermissionStatus] = React.useState(null)

  React.useEffect(() => {

    const run = async () => {
      await setNavigationState()
      const notificationStatus = await getCurrentNotificationPermissionStatus()
      const locationStatus = await getCurrentLocationPermissionStatus()

      if (locationStatus?.status === 'granted') await setUserLocation()
      if (notificationStatus?.status === 'granted') await setPushToken()

      setAuthenticated(true)
      setLocationPermissionStatus(locationStatus)
      setNotificationPermissionStatus(notificationStatus)
      SplashScreen.hideAsync()
    }

    run()
  }, [])


  async function setNavigationState() {
    const savedStateString = await AsyncStorage.getItem(USER_NAVIGATION_STATE_KEY)
    const state = savedStateString
      ? JSON.parse(savedStateString)
      : { routes: [{ name: 'main' }] }

    if (state !== undefined) setInitialNavigationState(state)
  }

  function saveNavigationState(state) {
    AsyncStorage.setItem(USER_NAVIGATION_STATE_KEY, JSON.stringify(state))
  }

  async function getCurrentNotificationPermissionStatus() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      })
    }

    return Notifications.getPermissionsAsync()
  }

  async function getCurrentLocationPermissionStatus() {
    return Location.getForegroundPermissionsAsync()
  }

  async function setPushToken() {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        })
      }

      const res = await Notifications.getExpoPushTokenAsync({ 'projectId': Constants.expoConfig.extra.eas.projectId })
      const savedToken = await AsyncStorage.getItem(USER_PUSH_NOTIFICATION_KEY)
      const newToken = res.data

      if (savedToken !== newToken) {
        await writePushToken(newToken)
        await AsyncStorage.setItem(USER_PUSH_NOTIFICATION_KEY, newToken)
      }

      setNotificationToken(newToken)
    } catch (e) {
      console.log("Error sending token", e)
    }
  }

  async function setUserLocation() {
    try {
      const res = await Location.getCurrentPositionAsync()

      setLocation({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude
      })
    } catch (e) {
      console.log("Error sending token", e)
    }
  }

  async function requestNotificationsPermissions() {
    let newStatus = await Notifications.getPermissionsAsync()

    if (newStatus?.status !== 'granted') newStatus = await Notifications.requestPermissionsAsync()
    setNotificationPermissionStatus(newStatus)
  }

  async function requestLocationsPermissions() {
    let newStatus = await Location.getForegroundPermissionsAsync()

    if (newStatus?.status !== 'granted') newStatus = await Location.requestForegroundPermissionsAsync()
    setLocationPermissionStatus(newStatus)
  }

  const validateNotificationPermissions = async () => {
    const options = [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]

    if (notificationPermissionStatus?.status !== "granted") {
      let errTitle = 'Error'
      let errMessage = 'Please enable push notifications in your settings'

      if (!notificationPermissionStatus?.canAskAgain) {
        options.push({ text: 'Settings', onPress: () => Linking.openURL('app-settings:') })
        Alert.alert(errTitle, errMessage, options)
        return null
      }

      if (notificationPermissionStatus?.canAskAgain) {
        errTitle = 'Enable Notifications'
        errMessage = 'Get alerts for Hoopfest events and important updates. You can change this anytime in Settings'
        options.push({ text: 'Ok', onPress: requestNotificationsPermissions })
      }

      Alert.alert(errTitle, errMessage, options)
    } else {
      const errTitle = 'Disable Notifications?'
      const errMessage = 'You can disable notifications from your settings'

      options.push({ text: 'Settings', onPress: () => Linking.openURL('app-settings:') })
      Alert.alert(errTitle, errMessage, options)
    }
  }

  const validateLocationsPermissions = async () => {
    const options = [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]

    if (locationPermissionStatus?.status !== "granted") {
      let errTitle = 'Error'
      let errMessage = 'Please enable location services in your settings'

      if (!locationPermissionStatus?.canAskAgain) {
        options.push({ text: 'Settings', onPress: () => Linking.openURL('app-settings:') })
        Alert.alert(errTitle, errMessage, options)
        return null
      }

      if (locationPermissionStatus?.canAskAgain) {
        errTitle = 'Enable Location Services '
        errMessage = 'Hoopfest needs access to your location to help navigate you to your courts and events. You can change this anytime in Settings.'
        options.push({ text: 'Ok', onPress: requestLocationsPermissions })

      }

      Alert.alert(errTitle, errMessage, options)
    } else {
      const errTitle = 'Disable Notifications?'
      const errMessage = 'You can disable location services from your settings'

      options.push({ text: 'Settings', onPress: () => Linking.openURL('app-settings:') })
      Alert.alert(errTitle, errMessage, options)
    }
  }

  const sendPushNotification = async (payload) => {
    try {
      if (notificationPermissionStatus?.status !== "granted") throw new Error('Invalid Notification Permission Status')
      if (notificationToken == null) throw new Error('No Push Token')

      const {
        title = '🏀 Assist from Dev Mode',
        body = 'Unlike your teammates, this notification actually showed up'
      } = payload

      await sendNotification(title, body, notificationToken)
    } catch (err) {
      console.log('Err sendPushNotification::', err)
    }
  }

  async function handleSetIsDeveloper() {
    await AsyncStorage.setItem(USER_DEVELOPER_KEY, JSON.stringify(true))
    setIsDeveloper(true)
  }

  const value = {
    active,
    location,
    isDeveloper,
    setIsDeveloper: handleSetIsDeveloper,
    setPushToken,
    authenticated,
    notificationToken,
    sendPushNotification,
    locationPermissionStatus,
    validateLocationsPermissions,
    notificationPermissionStatus,
    validateNotificationPermissions,
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
