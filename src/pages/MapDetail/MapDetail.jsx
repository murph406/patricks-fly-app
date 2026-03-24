import DraggableDrawer from '@components/composites/DraggableDrawer'
import Divider from '@components/elements/Divider'
import MapView from '@components/layouts/MapView'
import StatusBar from '@components/layouts/StatusBar'
import useStyles from '@hooks/useStyles'
import DrawerHeader from '@pages/Map/DrawerHeader'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { spokaneLatLng } from 'src/utils/Vars'
import BackIcon from '@assets/icons/back.svg'
import useNavigatePage from '@hooks/useNavigatePage'
import IconButton from '@components/elements/IconButton'
import Constants from "expo-constants"
import Text from '@components/elements/Text'
import MapPin from '@components/elements/MapPin'

const MapDetail = (props) => {
  const {
    type = '',
    headlineText = 'Map Detail',
    subHeader = 'Map subheader',
    body = 'Something here',
    coordinate = spokaneLatLng
  } = props.route.params

  const mapRef = React.useRef(null)
  const drawerRef = React.useRef(null)
  const [selectedCoordinate, setSelectedCoordinate] = React.useState(null)
  const s = useStyles(createStyles)

  const navigatePage = useNavigatePage()


  React.useEffect(() => {
    setTimeout(() => {
      setSelectedCoordinate(coordinate)
    }, 550)
  }, [coordinate])

  React.useEffect(() => {
    if (selectedCoordinate) mapRef.current.navigateToCoordinates?.([selectedCoordinate], 100)
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
        initialOpen={false}
        headerPanHandlersEnabled={false}
        maxHeight={s.maxDrawerHeight}
        minHeight={s.minDrawerHeight}>
        <View style={s.drawerContainer}>
          <View style={s.drawerHeader}>
            <DrawerHeader
              headline={headlineText}
              description={body}
            />

            <Divider />
          </View>

          <ScrollView >
            <View style={s.body}>
              <View style={s.textWrapper}>
                <Text>
                  <Text type='subtitle'>{subHeader}</Text>
                  <Text> </Text>
                </Text>
                <Text type='default' color='text2'>{body}</Text>
              </View>
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
      paddingBottom: vars.unit,
    },
    textWrapper: {
      gap: vars.half
    },
    minDrawerHeight: height * .15,
    maxDrawerHeight: height * .35
  })
}

export default MapDetail
