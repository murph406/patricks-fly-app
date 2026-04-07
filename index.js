import { registerRootComponent } from 'expo'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

import App from './App'
registerRootComponent(App)
