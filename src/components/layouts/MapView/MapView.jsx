import React from 'react'

import { StyleSheet } from 'react-native'

import { getCenter, getBounds } from 'geolib'
import ReactMapView, { UrlTile } from 'react-native-maps'

import useStyles from '@hooks/useStyles'
import { EventEmitter, GeoPoint } from '@utils/Structures'

// const URL_TEMPLATE = "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}"
const URL_TEMPLATE = "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"


const MapView = React.forwardRef(function MapView({ children, options = {} }, ref) {
  const emitterRef = React.useRef(new EventEmitter())
  const mapRef = React.useRef()
  const s = useStyles(createStyles)
  const seattleLatLng = new GeoPoint(47.639370, -122.326248)

  options = {
    zoomEnabled: false,
    scrollEnabled: false,
    rotateEnabled: false,
    pitchEnabled: false,
    showsUserLocation: true,
    region: {
      latitude: seattleLatLng.latitude,
      longitude: seattleLatLng.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    ...options,
  }

  React.useImperativeHandle(ref, () => {
    return {
      on: (event, callback) => emitterRef.current.on(event, callback),
      off: (event, callback) => emitterRef.current.off(event, callback),
      emit: (event, data) => emitterRef.current.emit(event, data),
      navigateToSeattle: (slideUpHeight = 400) => { mapRef.current.animateToRegion(getRegion([seattleLatLng], slideUpHeight), 1000) },
      navigateToCoordinates: (coordinates = [seattleLatLng], slideUpHeight = 400) => {
        if (coordinates == null || coordinates?.length == 0) return
        if (coordinates.length === 1) mapRef.current.animateToRegion(getRegion(coordinates, slideUpHeight), 1000)
        else mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: {
            top: 10,
            right: 50,
            bottom: slideUpHeight + 50,
            left: 50,
          },
          animated: true,
        })
      },
      seattleLatLng,
    }
  }, [])

  function getRegion(coordinates = [seattleLatLng], slideUpHeight = 0) {
    const bounds = getBounds(coordinates)
    const center = getCenter(coordinates)
    const LATITUDE_BUFFER = 0.01
    const LONGITUDE_BUFFER = 0.01
    const ZOOM_OUT_FACTOR = 1

    const latitudeDelta = (bounds.maxLat - bounds.minLat + LATITUDE_BUFFER) * ZOOM_OUT_FACTOR
    const longitudeDelta = (bounds.maxLng - bounds.minLng + LONGITUDE_BUFFER) * ZOOM_OUT_FACTOR
    const offsetPercentage = slideUpHeight / s.screenHeight
    const latitudeOffset = latitudeDelta * offsetPercentage * 0.5

    return {
      latitude: center.latitude - latitudeOffset,
      longitude: center.longitude,
      latitudeDelta,
      longitudeDelta
    }
  }

  return (
    <ReactMapView
      ref={mapRef}
      style={s.container}
      zoomEnabled={options?.zoomEnabled}
      scrollEnabled={options?.scrollEnabled}
      rotateEnabled={options?.rotateEnabled}
      pitchEnabled={options?.pitchEnabled}
      showsUserLocation={options?.showsUserLocation}
      region={options?.region}>
      <UrlTile
        urlTemplate={URL_TEMPLATE}
        maximumZ={19}
        flipY={false}
        shouldReplaceMapContent={true}
        tileSize={256}
      />
      {children}
    </ReactMapView>
  )
})


const createStyles = (theme, dimensions) => {
  const { height } = dimensions

  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      zIndex: 0,
    },
    screenHeight: height
  })
}

export default MapView