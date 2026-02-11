import React from 'react'

import { StyleSheet, StatusBar as ReactStatusBar, View } from 'react-native'

import Constants from "expo-constants"

import { useThemeContext } from '@stores/ThemeContext'
import useStyles from '@hooks/useStyles'

const StatusBar = () => {
  const theme = useThemeContext()
  const s = useStyles(createStyles)

  return (
    <View style={s.container}>
      <ReactStatusBar barStyle={'dark-content'} backgroundColor={theme.colors.brand} />
    </View>
  )
}

export default StatusBar

const createStyles = (theme) => {
  const { colors } = theme

  return StyleSheet.create({
    container: {
      height: Constants.statusBarHeight,
      backgroundColor: colors.brand
    }
  })
}
