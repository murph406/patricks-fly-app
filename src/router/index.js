import React from 'react'

import { NavigationContainer, createNavigatorFactory } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeFilledIcon from '@assets/icons/home-filled.svg'
import HomeIcon from '@assets/icons/home.svg'
import MapFilledIcon from '@assets/icons/map-filled.svg'
import MapIcon from '@assets/icons/map.svg'
import SearchFilledIcon from '@assets/icons/search-filled.svg'
import SearchIcon from '@assets/icons/search.svg'
import TabNavigator from '@components/layouts/TabNavigator'
import { useUserContext } from '@stores/UserContext'

import Splash from '@pages/Splash'
import Search from '@pages/Search'
import Map from '@pages/Map'
import Home from '@pages/Home'
import Webview from '@pages/Webview'
import Settings from '@pages/Settings'
import RiverDetail from '@pages/RiverDetail'
import RiverStationDetail from '@pages/RiverStationDetail'
import TidalStationDetail from '@pages/TidalStationDetail'

const MyTabNavigator = createNavigatorFactory(TabNavigator)

const MainTabNavigator = () => {
  const Tab = MyTabNavigator()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='home'
        component={Home}
        initialParams={{
          activeIcon: HomeFilledIcon,
          inactiveIcon: HomeIcon,
        }}
      />

      <Tab.Screen
        name='map'
        component={Map}
        initialParams={{
          activeIcon: MapFilledIcon,
          inactiveIcon: MapIcon,
        }}
      />

      <Tab.Screen
        name='search'
        component={Search}
        initialParams={{
          activeIcon: SearchFilledIcon,
          inactiveIcon: SearchIcon,
        }}
      />
    </Tab.Navigator>
  )
}

export default function Router() {
  const Stack = createNativeStackNavigator()
  const { active, authenticated, saveNavigationState, initialNavigationState } = useUserContext()
  const [navigatorReady, setNavigatorReady] = React.useState(false)

  async function setNavigatorIsReady() {
    setNavigatorReady(true)
  }

  return (
    <React.Fragment>
      <NavigationContainer
        initialState={initialNavigationState}
        onStateChange={saveNavigationState}
        onReady={setNavigatorIsReady}>
        <Stack.Navigator>
          <Stack.Group screenOptions={{ headerShown: false, animation: 'simple_push' }}>
            <Stack.Screen name="main" component={MainTabNavigator} options={{ animation: 'fade' }} />
            <Stack.Screen name="river-detail" component={RiverDetail} />
            <Stack.Screen name="tidal-station-detail" component={TidalStationDetail} />
            <Stack.Screen name="river-station-detail" component={RiverStationDetail} />
            <Stack.Screen name="webview" component={Webview} />
            <Stack.Screen name="settings" component={Settings} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>

      {(!navigatorReady || !active || authenticated == null) && <Splash />}
    </React.Fragment>
  )
}
