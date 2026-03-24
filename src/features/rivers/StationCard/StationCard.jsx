import Text from '@components/elements/Text'
import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'
import React from 'react'
import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native'

const StationCard = ({ label, id, onPress }) => {
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
        </View>

        <Text numberOfLines={2} style={s.text}>{label}</Text>
        <Text color='text2' numberOfLines={2} style={s.text}>{id}</Text>
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
    },
    cardContainer: {
      backgroundColor: isDarkMode ? colors.light.surface4 : colors.light.surface3,
      height: vars.unit * 10,
      borderRadius: vars.unit * .75,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: vars.unit,
    },
    text: {
      textAlign: 'center'
    }
  })
}


export default StationCard
