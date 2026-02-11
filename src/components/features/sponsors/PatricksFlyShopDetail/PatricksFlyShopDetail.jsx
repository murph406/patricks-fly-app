import React from 'react'

import { Dimensions, Image, StyleSheet, Animated, TouchableOpacity, View } from 'react-native'

import NorthernQuestLogo from '@assets/images/logo-retro.png'
import Text from '@components/elements/Text'
import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'
import useNavigatePage from '@hooks/useNavigatePage'
import { PATRICKS_FLY_SHOP_URL } from '@utils/Vars'

const { width } = Dimensions.get("screen")

const PatricksFlyShopDetail = () => {
  const s = useStyles(createStyles)

  const [pressed, setPressed] = React.useState(false)
  const togglePressed = () => setPressed((prev) => !prev)
  const navigatePage = useNavigatePage()

  const animation = useAnimation({ doAnimation: pressed })

  const interpolations = {
    scale: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .965],
    }),
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .75],
    })
  }

  function handleNavUrl() {
    return navigatePage('webview', {
      headlineText: "Patrick's Fly Shop",
      url: PATRICKS_FLY_SHOP_URL
    })
  }

  return (
    <View style={s.container}>
        <Text type='body'>Mobile app presented by Patricks Fly Shop</Text>

      <TouchableOpacity
        activeOpacity={1}
        onPress={handleNavUrl()}
        onPressIn={togglePressed}
        onPressOut={togglePressed}>
        <Animated.View
          style={[
            {
              transform: [{ scale: interpolations.scale }],
              opacity: interpolations.opacity
            }
          ]}>

          <Image
            style={s.logo}
            resizeMode="contain"
            source={NorthernQuestLogo} />
        </Animated.View>

      </TouchableOpacity>
    </View>
  )
}


const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      aspectRatio: '2/1',
      height: width / 2.5,
      marginBottom: vars.unit
    }
  })
}

export default PatricksFlyShopDetail
