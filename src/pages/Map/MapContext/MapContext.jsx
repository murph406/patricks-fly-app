import React from 'react'
import useSearch from '@hooks/useSearch'
import { RIVER_STATIONS } from '@config/riverStations'
import { TIDAL_STATIONS } from '@config/tidalStations'

const MapContext = React.createContext(null)

export const MapProvider = ({ children }) => {
  const mapRef = React.useRef()
  const mainDrawerRef = React.useRef()
  const search = useSearch()

  const riverStations = React.useMemo(() => {
    let data = Object.values(RIVER_STATIONS)

    if (!search.value || search.value === '') return data

    data = data.filter(item => {
      const searchString = `${item?.label} ${item?.riverName}`
      return searchString?.toLowerCase().includes(search.value.toLowerCase())
    })

    return data
  }, [search.value, RIVER_STATIONS])

  const tidalStations = React.useMemo(() => {
    let data = TIDAL_STATIONS

    if (!search.value || search.value === '') return data

    data = data.filter(item => {
      const searchString = `${item?.label} ${item?.riverName}`
      return searchString?.toLowerCase().includes(search.value.toLowerCase())
    })

    return data
  }, [search.value, TIDAL_STATIONS])

  const allPoi = React.useMemo(() => {
    let l = []

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

  const handleListScrollEnd = (evt) => {
    const VELOCITY_THRESHOLD = -.9
    const { contentOffset, velocity } = evt.nativeEvent
    const sY = contentOffset.y
    const vY = velocity?.y || 0

    if (sY <= 375 && vY < VELOCITY_THRESHOLD) mainDrawerRef.current.close()
  }

  const value = {
    mapRef,
    mainDrawerRef,
    handleListScrollEnd,
    search,
    allPoi,
    riverStations,
    tidalStations
  }

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  )
}

export function useMapContext() {
  return React.useContext(MapContext)
}
