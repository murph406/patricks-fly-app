import React from 'react'

import { StyleSheet, Animated, Pressable, View } from 'react-native'

import MapView from '@components/layouts/MapView'
import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'
import MapPin from '../MapPin'
import { GeoPoint } from 'src/utils/Structures'

const MapButton = ({ onPress, coordinate = new GeoPoint(47.658779, -117.426048) }) => {
  const mapRef = React.useRef()
  const s = useStyles(createStyles)
  const [pressed, setPressed] = React.useState(false)
  const togglePressed = () => setPressed((prev) => !prev)

  const animation = useAnimation({ doAnimation: pressed })
  const interpolations = {
    scale: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .975],
    })
  }

  return (
    <Animated.View
      style={[
        s.container,
        {
          transform: [{ scale: interpolations.scale }]
        }
      ]}>
      <Pressable
        onPress={onPress}
        onPressIn={togglePressed}
        onPressOut={togglePressed}
        style={s.inner}>
        <View style={s.position}>
          <MapView
            ref={mapRef}
            options={{
              scrollEnabled: false,
              zoomEnabled: false,
              rotateEnabled: false,
              pitchEnabled: false,
              showsUserLocation: false,
            }} >
            <MapPin
              title="Spokane"
              description="Washington"
              coordinate={coordinate}
            />
          </MapView>
        </View>
      </Pressable>
    </Animated.View>
  )
}

const createStyles = (theme) => {
  const { colors, vars } = theme
  const mapHeight = vars.unit * 18

  return StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 10
    },
    inner: {
      flex: 1,
      height: mapHeight,
      borderRadius: vars.radius.lg,
      backgroundColor: colors.surface2,
      overflow: "hidden",
    },
    position: {
      position: "absolute",
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: -1,
    },
  })
}


export default MapButton
