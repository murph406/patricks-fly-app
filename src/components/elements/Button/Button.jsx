import React from 'react'

import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'

import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'

import Text from '../Text'

const Button = ({ text = 'Button', color = 'surface3', loading, onPress, style }) => {
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
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={togglePressed}
      onPressOut={togglePressed}
      style={[
        style,
        s.container,
        s[color],
        {
          transform: [{ scale: interpolations.scale }],
        }
      ]}>
      {!loading
        ? <Text type='default' style={s[color]}>{text}</Text>
        : <ActivityIndicator color={s[color].color} />
      }
    </TouchableOpacity>
  )
}

export default Button

const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: vars.radius.xlg,
      height: vars.controls.sm,
      paddingHorizontal: vars.double, 
    },
    brand: {
      backgroundColor: colors.brand,
    },
    surface3: {
      backgroundColor: colors.surface3,
    },
    surface5: {
      backgroundColor: colors.surface5,
    }
  })
}

