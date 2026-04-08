import React from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'

import Constants from "expo-constants"

import BackIcon from '@assets/icons/back.svg'
import DraggableDrawer from '@components/composites/DraggableDrawer'
import DrawerHeader from '@components/composites/DrawerHeader'
import Divider from '@components/elements/Divider'
import IconButton from '@components/elements/IconButton'
import MapPin from '@components/elements/MapPin'
import Text from '@components/elements/Text'
import MapView from '@components/layouts/MapView'
import StatusBar from '@components/layouts/StatusBar'
import useNavigatePage from '@hooks/useNavigatePage'
import useStyles from '@hooks/useStyles'
import { spokaneLatLng } from '@utils/Vars'

const MapDetail = (props) => {
  const {
    type = '',
    headlineText = 'Map Detail',
    subHeader = null,
    body = 'Something here',
    coordinate = spokaneLatLng,
    maxDrawerHeight = null
  } = props.route.params

  const mapRef = React.useRef(null)
  const drawerRef = React.useRef(null)
  const [selectedCoordinate, setSelectedCoordinate] = React.useState(null)
  const s = useStyles(createStyles, { maxDrawerHeight })

  const navigatePage = useNavigatePage()

  React.useEffect(() => {
    setTimeout(() => {
      setSelectedCoordinate(coordinate)
    }, 550)
  }, [coordinate])

  React.useEffect(() => {
    if (selectedCoordinate) mapRef.current.navigateToCoordinates?.([selectedCoordinate], maxDrawerHeight || 120)
  }, [selectedCoordinate])

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
            latitude: coordinate?.latitude,
            longitude: coordinate?.longitude,
          }}>
          {selectedCoordinate && <MapPin type={type} title={headlineText} coordinate={coordinate} />}
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
              headline={headlineText}
              description={subHeader}
            />

            <Divider />
          </View>

          <ScrollView >
            <View style={s.body}>
              <View style={s.textWrapper}>
                <Text type='default' color='text2'>{body}</Text>
              </View>
            </View>
          </ScrollView>

        </View>
      </DraggableDrawer>
    </View>
  )
}


const createStyles = (theme, dimensions, props) => {
  const { width, height } = dimensions
  const { maxDrawerHeight: defaultMaxDrawerHeight } = props
  const { vars, colors } = theme
  const isLandscape = width > height
  const maxDrawerHeight = defaultMaxDrawerHeight || height * .175

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerContainer: {
      flex: 1,
      paddingTop: vars.unit,
      paddingHorizontal: vars.unit,
    },
    drawerHeader: {
      gap: vars.unit,
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
      paddingBottom: vars.double * 2,
    },
    textWrapper: {
      gap: vars.half
    },
    minDrawerHeight: 0,
    maxDrawerHeight
  })
}

export default MapDetail
