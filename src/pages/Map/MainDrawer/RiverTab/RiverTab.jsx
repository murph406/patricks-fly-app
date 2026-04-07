import React from 'react'

import { FlatList, StyleSheet, View } from 'react-native'

import useStyles from '@hooks/useStyles'
import EmptyState from '@components/composites/EmptyState'
import ListButton from '@components/elements/ListButton'
import Divider from '@components/elements/Divider'
import { useMapContext } from '@pages/Map/MapContext'

const RiverTab = () => {
  const s = useStyles(createStyles)
  const { riverStations, handleListScrollEnd } = useMapContext()

  return (
    <View style={s.container}>
      {(riverStations !== null && riverStations?.length != 0) && (
        <FlatList
          scrollEnabled={true}
          data={riverStations}
          scrollEventThrottle={16}
          onScrollEndDrag={handleListScrollEnd}
          ListFooterComponent={<Divider />}
          ItemSeparatorComponent={<Divider />}
          renderItem={({ item }) => (
            <ListButton
              key={item?.id}
              text={item?.label}
              headline={item?.label}
            />
          )}
        />
      )}

      {(riverStations == null || riverStations?.length == 0) && (
        <View style={s.center}>
          <EmptyState type='search-off' text='No Results' />
        </View>
      )}
    </View>
  )
}

export default RiverTab

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
