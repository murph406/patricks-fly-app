import React from 'react'

import { StyleSheet, View } from 'react-native'

import StatusBar from '@components/layouts/StatusBar'
import useStyles from '@hooks/useStyles'

const Header = () => {
  const s = useStyles(createStyles)

  return (
    <React.Fragment>
      <StatusBar />

      <View style={s.container} />
    </React.Fragment>
  )
}

export default Header

const createStyles = (theme) => {
  const { colors } = theme

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.brand
    },
  })
}
