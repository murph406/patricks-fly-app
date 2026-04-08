import React from 'react'

import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native'

import Text from '@components/elements/Text'
import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'

const RiverStationCard = ({ label, id, onPress }) => {
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
        <View style={s.cardContainer}>
          <Text  numberOfLines={1} style={s.text}>{id}</Text>
          <Text color='text2' numberOfLines={2} style={s.text}>{label}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const createStyles = (theme, dimensions) => {
  const { colors, vars, colorScheme } = theme
  const isDarkMode = colorScheme === 'dark'

  return StyleSheet.create({
    container: {
      width: ((dimensions.width - vars.unit * 3) / 2.5),
      marginBottom: vars.half,
    },
    cardContainer: {
      backgroundColor: isDarkMode ? colors.surface4 : colors.surface4,
      height: vars.unit * 10,
      padding: vars.unit * .35,
      gap: vars.half,
      borderRadius: vars.unit * .75,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      textAlign: 'center'
    }
  })
}


export default RiverStationCard
