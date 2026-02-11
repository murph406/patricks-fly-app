import useSearch from '@hooks/useSearch'
import React from 'react'

const MapContext = React.createContext(null)

export const MapProvider = ({ children }) => {
  const mapRef = React.useRef()
  const mainDrawerRef = React.useRef()
  const search = useSearch()

  const value = {
    mapRef,
    mainDrawerRef,
    search,
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
