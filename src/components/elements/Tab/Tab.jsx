import React from 'react'

import { StyleSheet, TouchableOpacity } from 'react-native'

import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'

import Text from '../Text'

const Tab = ({ text = '', color = 'brand', onPress }) => {
  const [pressed, setPressed] = React.useState(false)
  const togglePressed = () => setPressed((prev) => !prev)
  const s = useStyles(createStyles)

  const animation = useAnimation({ doAnimation: pressed })
  const interpolations = {
    scale: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .96],
    })
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={togglePressed}
      onPressOut={togglePressed}
      style={[s.container, s[color], { transform: [{ scale: interpolations.scale }] }]}>
      <Text type='body'>{text}</Text>
    </TouchableOpacity>
  )
}

const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: vars.radius.lg,
      height: 2.5 * vars.unit,
      minWidth: 8 * vars.unit,
      paddingHorizontal: vars.unit
    },
    brand: {
      backgroundColor: colors.brand,
      color: colors.white,
    },
    surface2: {
      backgroundColor: colors.surface2,
      color: colors.white,
    },
    surface3: {
      backgroundColor: colors.surface3,
      color: colors.white,
    },
    surface4: {
      backgroundColor: colors.surface4,
      color: colors.white,
    }
  })
}



export default Tab
