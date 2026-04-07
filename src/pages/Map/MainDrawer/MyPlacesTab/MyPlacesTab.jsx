import React from 'react'

import { StyleSheet, View } from 'react-native'

import useStyles from '@hooks/useStyles'
import EmptyState from '@components/composites/EmptyState'

const MyPlacesTab = () => {
  const s = useStyles(createStyles)

  return (
    <View style={s.container}>
      <View style={s.center}>
        <EmptyState text='Coming Soon' />
      </View>
    </View>
  )
}

export default MyPlacesTab

const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    center: {
      flex: 1,
      gap: vars.double,
      padding: vars.unit,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}
