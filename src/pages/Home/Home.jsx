import React from 'react'

import { ScrollView, StyleSheet } from 'react-native'

import View from '@components/elements/View'

import Header from './Header'
import useStyles from '@hooks/useStyles'
import PatricksFlyShopDetail from '@components/features/sponsors/PatricksFlyShopDetail'
import RiverCard from '@features/rivers/RiverCard'
import HorizontalList from '@components/composites/HorizontalList'
import { RIVERS } from '@config/rivers'
import useNavigatePage from '@hooks/useNavigatePage'
import EmptyState from '@components/composites/EmptyState'
import MapButtonGroup from '@components/composites/MapButtonGroup'
import { TIDAL_STATIONS } from '@config/tidalStations'
import TidalStationCard from '@features/tides/TidalStationCard'
import { useUserContext } from '@stores/UserContext'
import Button from '@components/elements/Button'

const Home = () => {
  const s = useStyles(createStyles)
  const navigatePage = useNavigatePage()

  const {
    locationPermissionStatus,
    notificationPermissionStatus,
    validateLocationsPermissions,
    validateNotificationPermissions
  } = useUserContext()

  return (
    <View style={s.container}>
      <Header />
      <ScrollView style={s.container}>
        <View style={s.body}>

          {((notificationPermissionStatus?.canAskAgain && !notificationPermissionStatus?.granted) || (locationPermissionStatus?.canAskAgain && !locationPermissionStatus?.granted)) && (
            <View style={s.gap}>
              {(notificationPermissionStatus?.canAskAgain && !notificationPermissionStatus?.granted) && (
                <View style={s.buttonContainer}>
                  <Button text='Enable Push Notifications' onPress={validateNotificationPermissions} />
                </View>
              )}

              {(locationPermissionStatus?.canAskAgain && !locationPermissionStatus?.granted) && (
                <View style={s.buttonContainer}>
                  <Button text='Enable Location Services' onPress={validateLocationsPermissions} />
                </View>
              )}
            </View>
          )}

          <HorizontalList
            label='My Places'
            listEmptyComponent={<EmptyState fill type='coming-soon' text='Coming Soon' />}
          />

          <MapButtonGroup
            label='Map'
            enablePin={false}
            onPress={navigatePage('map')}
          />

          <HorizontalList
            label='Rivers'
            data={RIVERS}
            listEmptyComponent={<EmptyState fill />}
            renderItem={({ item, index }) => (
              <RiverCard {...item} key={`${item?.id}-${index}`} onPress={navigatePage('river-detail', item)} />
            )}
          />

          <HorizontalList
            label='Tidal Stations'
            data={TIDAL_STATIONS}
            listEmptyComponent={<EmptyState fill />}
            renderItem={({ item, index }) => (
              <TidalStationCard {...item} key={`${item?.id}-${index}`} onPress={navigatePage('tidal-station-detail', item)} />
            )}
          />

          <View style={s.spacing} />

          <PatricksFlyShopDetail />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      gap: vars.double,
      paddingTop: vars.unit,
      paddingBottom: vars.unit
    },
    spacing: {
      maxHeight: vars.unit * 4,
      width: 1,
    },
    gap: {
      gap: vars.unit,
      paddingTop: vars.unit,
    },
    buttonContainer: {
      paddingHorizontal: vars.unit,
    },
  })
}