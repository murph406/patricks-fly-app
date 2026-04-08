import React from 'react'

import { StyleSheet } from 'react-native'

import { RIVER_STATIONS } from '@config/riverStations'
import { TIDAL_STATIONS } from '@config/tidalStations'
import useSearch from '@hooks/useSearch'
import useStyles from '@hooks/useStyles'
import { GeoPoint } from '@utils/Structures'

const MapContext = React.createContext(null)

export const MapProvider = ({ children }) => {
  const mapRef = React.useRef()
  const mainDrawerRef = React.useRef()
  const riverDrawerRef = React.useRef()
  const tidalDrawerRef = React.useRef()
  const search = useSearch()
  const s = useStyles(createStyles)

  const [selected, setSelected] = React.useState({})

  const riverStations = React.useMemo(() => {
    let data = Object.values(RIVER_STATIONS)

    if (!search.value || search.value === '') return data

    data = data.filter(item => {
      const searchString = `${item?.label} ${item?.riverName}`
      return searchString?.toLowerCase().includes(search.value.toLowerCase())
    })

    return data
  }, [search.value])

  const tidalStations = React.useMemo(() => {
    let data = TIDAL_STATIONS

    if (!search.value || search.value === '') return data

    data = data.filter(item => {
      const searchString = `${item?.label} ${item?.riverName}`
      return searchString?.toLowerCase().includes(search.value.toLowerCase())
    })

    return data
  }, [search.value])

  const allPoi = React.useMemo(() => {
    const l = []

    if (riverStations) for (let i = 0; i < riverStations.length; i++) {
      l.push({
        type: 'river-station',
        data: riverStations[i]
      })
    }

    if (tidalStations) for (let i = 0; i < tidalStations?.length; i++) {
      l.push({
        type: 'tidal-station',
        data: tidalStations[i]
      })
    }

    return l
  }, [riverStations, tidalStations])

  React.useEffect(() => {
    if (selected?.coordinate) mapRef.current.navigateToCoordinates?.([selected.coordinate], selected?.drawerHeight)
  }, [selected])

  const handleListScrollEnd = (evt) => {
    const VELOCITY_THRESHOLD = -.9
    const { contentOffset, velocity } = evt.nativeEvent
    const sY = contentOffset.y
    const vY = velocity?.y || 0

    if (sY <= 375 && vY < VELOCITY_THRESHOLD) mainDrawerRef.current.close()
  }

  function handleItemClick(type = '', item = {}) {
    return () => {
      const title = ''
      const description = ''
      let drawerHeight = 0
      let coordinate = 0

      switch (type) {
        case 'river-station':
          coordinate = new GeoPoint(item?.lat, item?.lng)
          drawerHeight = s.defaultMaxDrawerHeight
          setSelected({ type, coordinate, title, description, drawerHeight, ...item })
        case 'tidal-station':
          coordinate = new GeoPoint(item?.lat, item?.lng)
          drawerHeight = s.defaultMaxDrawerHeight
          setSelected({ type, coordinate, title, description, drawerHeight, ...item })
        default:
          break
      }

      mainDrawerRef.current.close()
    }
  }

  const value = {
    mapRef,
    mainDrawerRef,
    riverDrawerRef,
    tidalDrawerRef,
    handleListScrollEnd,
    handleItemClick,
    setSelected,
    selected,
    search,
    allPoi,
    riverStations,
    tidalStations,
    DEFAULT_DRAWER_HEIGHT: s.defaultMaxDrawerHeight,
  }

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  )
}

const createStyles = (_, dimensions) => {
  const { height } = dimensions

  return StyleSheet.create({
    defaultMaxDrawerHeight: height * .5,
  })
}


export function useMapContext() {
  return React.useContext(MapContext)
}
