import React from 'react'

import { FlatList, StyleSheet, View } from 'react-native'


import EmptyState from '@components/composites/EmptyState'
import Divider from '@components/elements/Divider'
import ListButton from '@components/elements/ListButton'
import useStyles from '@hooks/useStyles'
import { useMapContext } from '@pages/Map/MapContext'


const TidalTab = () => {
  const s = useStyles(createStyles)
  const { handleItemClick, tidalStations, handleListScrollEnd } = useMapContext()

  return (
    <View style={s.container}>
      {(tidalStations !== null && tidalStations?.length != 0) && (
        <FlatList
          scrollEnabled={true}
          data={tidalStations}
          scrollEventThrottle={16}
          onScrollEndDrag={handleListScrollEnd}
          ListFooterComponent={<Divider />}
          ItemSeparatorComponent={<Divider />}
          renderItem={({ item }) => (
            <ListButton
              key={item?.id}
              headline={item?.name}
              text={item?.location}
              onPress={handleItemClick('tidal-station', item)}
            />
          )}
        />
      )}

      {(tidalStations == null || tidalStations?.length == 0) && (
        <View style={s.center}>
          <EmptyState type='search-off' text='No Results' />
        </View>
      )}
    </View>
  )
}

export default TidalTab

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
