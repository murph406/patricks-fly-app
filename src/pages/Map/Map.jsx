import React from 'react'

import { StyleSheet } from 'react-native'

import MapPin from '@components/elements/MapPin'
import View from '@components/elements/View'
import MapView from '@components/layouts/MapView'
import StatusBar from '@components/layouts/StatusBar'
import useStyles from '@hooks/useStyles'

import MainDrawer from './MainDrawer'
import { MapProvider, useMapContext } from './MapContext'
import RiverStationDrawer from './RiverStationDrawer'
import TidalStationDrawer from './TidalStationDrawer'

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
      <RiverStationDrawer />
      <TidalStationDrawer />
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
