import React from 'react'

import { StyleSheet, TouchableOpacity } from 'react-native'

import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'

const TabButton = ({ route, active, onPress }) => {
  const s = useStyles(createStyles)

  const [pressed, setPressed] = React.useState(false)
  const togglePressed = () => setPressed((prev) => !prev)

  const Icon = active ? route.params.activeIcon : route.params.inactiveIcon
  const animation = useAnimation({ doAnimation: pressed })
  const interpolations = {
    scale: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .9],
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
        {
          transform: [{ scale: interpolations.scale }],
        }
      ]}>
      <Icon
        fill={active ? s.default : s.text2}
        style={s.icon}
      />
    </TouchableOpacity>
  )
}

const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: vars.unit * 2.5,
      height: vars.unit * 2.5
    },
    default: colors.default,
    text2: colors.text2,
  })
}

export default TabButton
