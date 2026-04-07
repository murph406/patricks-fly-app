import React from 'react'

import { StyleSheet } from 'react-native'

import View from '@components/elements/View'
import MapView from '@components/layouts/MapView'
import StatusBar from '@components/layouts/StatusBar'
import useStyles from '@hooks/useStyles'
import { MapProvider, useMapContext } from './MapContext'
import MainDrawer from './MainDrawer'
import MapPin from '@components/elements/MapPin'

const Map = () => {
  const { selected, mapRef } = useMapContext()
  const s = useStyles(createStyles)

  return (
    <View style={s.container}>
      <StatusBar />

      <View style={s.container}>
        <MapView ref={mapRef}>
          {selected && <MapPin {...selected} />}
        </MapView>
      </View>

      <MainDrawer />
    </View>
  )
}

const MapPage = () => {
  return (
    <MapProvider>
      <Map />
    </MapProvider>
  )
}

const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    }
  })
}

export default MapPage
