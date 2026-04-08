import React from 'react'

import { StyleSheet, View } from 'react-native'

import useStyles from '@hooks/useStyles'

const Divider = ({ padding = 'p0' }) => {
  const s = useStyles(createStyles)
  return <View style={[s.container, s[padding]]} />
}

const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      height: vars.lineHeight,
      backgroundColor: colors.surface4,
      zIndex: 1000,
    }, 
    p1: {
      marginHorizontal: vars.unit
    }
  })
}

export default Divider
