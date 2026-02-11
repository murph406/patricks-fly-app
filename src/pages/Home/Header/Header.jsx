import React from 'react'

import { Image, StyleSheet, View } from 'react-native'

import StatusBar from '@components/layouts/StatusBar'
import useStyles from '@hooks/useStyles'

const Header = () => {
  const s = useStyles(createStyles)

  return (
    <React.Fragment>
      <StatusBar />
    </React.Fragment>
  )
}

export default Header

const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: colors.surface2,
      paddingLeft: vars.unit,
      paddingRight: vars.unit,
      paddingBottom: vars.unit * .5,
      paddingTop: vars.unit * .25,
      borderColor: colors.surface4,
      borderBottomWidth: vars.lineHeight
    },
    logo: {
      width: vars.unit * 12,
      height: vars.controls.sm,
      resizeMode: 'contain',
    },
  })
}
