import React from "react"
import { StyleSheet, Animated, View, Image } from "react-native"
import Constants from "expo-constants"
import * as ScreenOrientation from 'expo-screen-orientation'

import useStyles from "@hooks/useStyles"
import BackSplashImage from "@assets/images/casting.jpg"
import IconButton from "../../elements/IconButton"
import BackIcon from '@assets/icons/back.svg'
import Text from "../../elements/Text"

const ImageView = React.forwardRef(function ImageView(props, ref) {
  const {
    maxHeight = 103,
    allowLandscape = false,
    tintColor,
    backgroundImage = BackSplashImage,
    onPressBack,
    children,
    text
  } = props

  const scrollY = React.useRef(new Animated.Value(0)).current
  const containerRef = React.useRef(null)
  const scrollViewRef = React.useRef(null)
  const s = useStyles(createStyles, { maxHeight, tintColor })

  React.useEffect(() => {
    if (!allowLandscape) return
    ScreenOrientation.unlockAsync()

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }
  }, [allowLandscape])

  const headerScale = scrollY.interpolate({
    inputRange: [-maxHeight * 1.5, 0],
    outputRange: [4, 1.2],
    extrapolate: 'clamp',
  })

  const headerTextOpacity = scrollY.interpolate({
    inputRange: [-maxHeight * .5, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const headerOverlayOpacity = scrollY.interpolate({
    inputRange: [-maxHeight, 0],
    outputRange: [s.minOverlayOpacity, s.maxOverlayOpacity],
    extrapolate: 'clamp',
  })

  return (
    <View style={s.container}>
      <Animated.View style={[s.header, { transform: [{ scale: headerScale }] }]}>
        <Image
          source={backgroundImage}
          style={[s.image, { height: maxHeight }]} />
        <Animated.View style={[s.overlay, { opacity: headerOverlayOpacity }]} />
      </Animated.View>

      <Animated.View
        ref={containerRef}
        style={[s.scrollViewContainer]}>

        <View style={s.backContainer}>
          <IconButton
            icon={<BackIcon />}
            onPress={onPressBack}
          />
        </View>

        <Animated.View style={[s.headerText, { opacity: headerTextOpacity }]}>
          <Text type="subtitle" color='white' numberOfLines={1}>{text}</Text>
        </Animated.View>

        <Animated.ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          overScrollMode='never'>
          <View style={s.scrollInner}>
            {children}
          </View>
        </Animated.ScrollView>
      </Animated.View>
    </View>
  )
})

const createStyles = (theme, dimensions, props) => {
  const { maxHeight, tintColor } = props
  const { colors, vars, colorScheme } = theme
  const { width, height } = dimensions
  const isLandscape = width > height
  const isDarkMode = colorScheme === 'dark'

  return StyleSheet.create({
    minOverlayOpacity: isDarkMode ? .3 : 0,
    maxOverlayOpacity: isDarkMode ? .5 : .3,
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      height: !isLandscape && '100%',
      width: !isLandscape && '100%',
      resizeMode: 'cover',
      backgroundColor: colors.surface3,
      tintColor,
      width,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      backgroundColor: 'black',
    },
    scrollViewContainer: {
      flex: 1,
      width: dimensions.width,
    },
    scrollInner: {
      flex: 1,
      borderTopRightRadius: vars.radius.xlg,
      borderTopLeftRadius: vars.radius.xlg,
      marginTop: isLandscape ? 0 : maxHeight,
      backgroundColor: colors.surface,
      minHeight: height * .875,
    },
    backContainer: {
      position: 'absolute',
      top: isLandscape ? vars.double : Constants.statusBarHeight,
      left: isLandscape ? vars.double : vars.unit,
      zIndex: 10,
      shadowColor: colors.black,
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    headerText: {
      position: 'absolute',
      top: isLandscape ? vars.double : Constants.statusBarHeight,
      left: vars.double * 3,
      right: vars.double * 3,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: vars.unit * 3.25,
    }
  })
}

export default ImageView