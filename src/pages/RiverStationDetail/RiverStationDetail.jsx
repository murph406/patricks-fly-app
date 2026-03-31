import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { format, parseISO } from 'date-fns'

import DraggableDrawer from '@components/composites/DraggableDrawer'
import Divider from '@components/elements/Divider'
import MapView from '@components/layouts/MapView'
import StatusBar from '@components/layouts/StatusBar'
import useStyles from '@hooks/useStyles'
import BackIcon from '@assets/icons/back.svg'
import useNavigatePage from '@hooks/useNavigatePage'
import IconButton from '@components/elements/IconButton'
import Constants from "expo-constants"
import MapPin from '@components/elements/MapPin'
import DrawerHeader from '@components/composites/DrawerHeader'
import { GeoPoint } from 'src/utils/Structures'
import { useRiverFlow } from '@hooks/useRiverFlow'
import RiverFlowChart from './RiverFlowChart'

const RiverStationDetail = ({ route }) => {
  const {
    type = '',
    label,
    id,
    lat,
    lng,
  } = route.params

  const mapRef = React.useRef(null)
  const drawerRef = React.useRef(null)
  const s = useStyles(createStyles)
  const navigatePage = useNavigatePage()
  const defaultCoordinate = React.useRef(new GeoPoint(lat, lng))
  const [selectedCoordinate, setSelectedCoordinate] = React.useState(null)
  const riverFlow = useRiverFlow(id)

  const lastObserved = React.useMemo(() => {
    if (riverFlow?.observed?.issuedTime) return format(parseISO(riverFlow.observed.issuedTime), 'MMM d, yyyy h:mm a')
    return null
  }, [riverFlow])

  React.useEffect(() => {
    if (selectedCoordinate) mapRef.current.navigateToCoordinates?.([selectedCoordinate], s.maxDrawerHeight + 100)
  }, [selectedCoordinate])

  React.useEffect(() => {
    setTimeout(() => {
      setSelectedCoordinate(new GeoPoint(lat, lng))
    }, 550)
  }, [lat, lng])

  return (
    <View style={s.container}>
      <StatusBar />

      <View style={s.backContainer}>
        <IconButton
          icon={<BackIcon />}
          onPress={navigatePage()}
        />
      </View>

      <View style={s.container}>
        <MapView
          ref={mapRef}
          options={{
            zoomEnabled: true,
            scrollEnabled: true,
            rotateEnabled: true,
            pitchEnabled: true,
            showsUserLocation: true,
            region: {
              latitude: defaultCoordinate.current.latitude,
              longitude: defaultCoordinate.current.longitude,
              latitudeDelta: .015,
              longitudeDelta: 0.015,
            }
          }}>
          {selectedCoordinate && <MapPin type={type} title={label} coordinate={selectedCoordinate} />}
        </MapView>
      </View>

      <DraggableDrawer
        ref={drawerRef}
        headerPanHandlersEnabled={false}
        maxHeight={s.maxDrawerHeight}
        minHeight={s.minDrawerHeight}>
        <View style={s.drawerContainer}>
          <View style={s.drawerHeader}>
            <DrawerHeader
              headline={`${label} Station`}
              description={lastObserved && `Latest Observation - ${lastObserved}`}
            />

            <Divider />
          </View>

          <ScrollView >
            <View style={s.body}>
              <RiverFlowChart {...riverFlow} />
            </View>
          </ScrollView>

        </View>
      </DraggableDrawer>
    </View>
  )
}


const createStyles = (theme, dimensions) => {
  const { width, height } = dimensions
  const { vars, colors } = theme
  const isLandscape = width > height

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerContainer: {
      flex: 1,
      paddingTop: vars.unit,
    },
    drawerHeader: {
      gap: vars.unit,
      paddingHorizontal: vars.unit,
    },
    backContainer: {
      position: 'absolute',
      top: isLandscape ? vars.double : Constants.statusBarHeight + vars.unit,
      left: isLandscape ? vars.double : vars.unit,
      zIndex: 10,
      shadowColor: colors.black,
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    body: {
      flex: 1,
      gap: vars.unit,
      paddingTop: vars.unit,
      paddingBottom: vars.unit,
    },
    textWrapper: {
      gap: vars.half
    },
    minDrawerHeight: height * .15,
    maxDrawerHeight: height * .475
  })
}

export default RiverStationDetail
