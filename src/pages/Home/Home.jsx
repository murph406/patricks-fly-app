import React from 'react'

import { StyleSheet, Image } from 'react-native'

import View from '@components/elements/View'

import Header from './Header'
import useStyles from '@hooks/useStyles'
import Text from '@components/elements/Text'
import PatricksFlyShopDetail from '@components/features/sponsors/PatricksFlyShopDetail'

const Home = () => {
  const s = useStyles(createStyles)

  return (
    <View style={s.container}>
      <Header />

      <View style={s.body}>

        <Text type='title'>Hello World</Text>

        <View style={s.spacing}/>

        <PatricksFlyShopDetail />

      </View>
    </View>
  )
}

export default Home

const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      gap: vars.unit,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: vars.unit,
      paddingBottom: vars.unit
    },
    spacing: {
      maxHeight: vars.unit * 4,
      width: 1, 
    }
  })
}