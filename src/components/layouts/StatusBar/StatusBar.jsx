import React from 'react'

import { StyleSheet, StatusBar as ReactStatusBar, View } from 'react-native'

import Constants from "expo-constants"

import useStyles from '@hooks/useStyles'
import { useThemeContext } from '@stores/ThemeContext'

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
