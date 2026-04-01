import React from 'react'

import { ScrollView, StyleSheet } from 'react-native'

import View from '@components/elements/View'

import Header from './Header'
import useStyles from '@hooks/useStyles'
import PatricksFlyShopDetail from '@components/features/sponsors/PatricksFlyShopDetail'
import RiverCard from 'src/features/rivers/RiverCard'
import HorizontalList from '@components/composites/HorizontalList'
import { RIVERS } from 'src/config/rivers'
import useNavigatePage from '@hooks/useNavigatePage'
import EmptyState from '@components/composites/EmptyState'
import MapButtonGroup from '@components/composites/MapButtonGroup'

const Home = () => {
  const s = useStyles(createStyles)
  const navigatePage = useNavigatePage()

  return (
    <View style={s.container}>
      <Header />
      <ScrollView style={s.container}>
        <View style={s.body}>

          <HorizontalList
            label='My Places'
            listEmptyComponent={<EmptyState fill text='Coming Soon'/>}
          />

          <MapButtonGroup
            label='Map'
            enablePin={false}
            onPress={navigatePage('map')}
          />

          <HorizontalList
            label='Rivers'
            data={RIVERS}
            renderItem={({ item }) => (
              <RiverCard {...item} key={item?.Id} onPress={navigatePage('river-detail', item)} />
            )}
          />

          <HorizontalList
            label='Tidal Stations'
            listEmptyComponent={<EmptyState fill />}
          />

          <View style={s.spacing} />

          <PatricksFlyShopDetail />
        </View>
      </ScrollView>
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
      gap: vars.double,
      paddingTop: vars.unit,
      paddingBottom: vars.unit
    },
    spacing: {
      maxHeight: vars.unit * 4,
      width: 1,
    }
  })
}