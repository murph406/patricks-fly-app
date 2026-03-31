import Text from '@components/elements/Text'
import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'
import React from 'react'
import { StyleSheet, TouchableOpacity, Image as RNImage, Animated } from 'react-native'

const RiverCard = ({ name, state, image, onPress }) => {
  const [pressed, setPressed] = React.useState(false)
  const togglePressed = () => setPressed((prev) => !prev)
  const s = useStyles(createStyles)

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
        {
          transform: [{ scale: interpolations.scale }],
        }
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={togglePressed}
        onPressOut={togglePressed}
        style={s.container}>

        <RNImage
          source={image}
          style={s.logoContainer}
        />

        <Text numberOfLines={2} style={s.text}>{name}</Text>
        <Text color='text2' numberOfLines={2} style={s.text}>{state}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const createStyles = (theme, dimensions) => {
  const { colors, vars, colorScheme } = theme
  const isDarkMode = colorScheme === 'dark'

  return StyleSheet.create({
    container: {
    },
    logoContainer: {
      borderRadius: vars.unit,
      height: vars.unit * 10,
      borderRadius: vars.unit * .75,
      aspectRatio: 1.35,
      overflow: 'hidden',
      resizeMode: 'cover',
      backgroundColor: isDarkMode ? colors.light.surface : colors.light.surface3,
      marginBottom: vars.half
    },
    text: {
      textAlign: 'center'
    }
  })
}


export default RiverCard
