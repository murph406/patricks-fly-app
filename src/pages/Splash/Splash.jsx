import React from 'react'

import { StyleSheet } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import useStyles from '@hooks/useStyles'

const Splash = () => {
  const s = useStyles(createStyles)

  return (
    <SafeAreaView style={s.container}>

    </SafeAreaView>
  )
}

export default Splash
const createStyles = (theme) => {
  const { colors } = theme

  return StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: colors.surface2,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}
