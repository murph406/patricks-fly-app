import React from 'react'

import { StyleSheet, TouchableOpacity } from 'react-native'

import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'

const IconButton = ({ icon, color = 'white', text = 'textBlack', type = 'circle', onPress }) => {
  const s = useStyles(createStyles)

  const [pressed, setPressed] = React.useState(false)
  const togglePressed = () => setPressed((prev) => !prev)

  const animation = useAnimation({ doAnimation: pressed })
  const interpolations = {
    scale: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .95],
    })
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={togglePressed}
      onPressOut={togglePressed}
      style={[
        s.container,
        s[color],
        {
          borderRadius: type === 'circle' ? 1000 : 0,
          transform: [{ scale: interpolations.scale }],
        }
      ]}>
      {React.cloneElement(icon, { fill: s[text] })}
    </TouchableOpacity>
  )
}

const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      height: vars.controls.sm,
      width: vars.controls.sm,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: vars.radius.sm,
    },
    brand: {
      backgroundColor: colors.brand
    },
    white: {
      backgroundColor: colors.white,
    },
    surface2: {
      backgroundColor: colors.surface2,
    },
    surface3: {
      backgroundColor: colors.surface3,
    },
    brand2: {
      backgroundColor: colors.brand2
    },
    text: colors.text2,
    text2: colors.light.text2,
    textWhite: colors.black,
    textBlack: colors.black,
  })
}

export default IconButton
