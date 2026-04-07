import React from 'react'

import { FlatList, StyleSheet, View } from 'react-native'

import useStyles from '@hooks/useStyles'
import EmptyState from '@components/composites/EmptyState'
import ListButton from '@components/elements/ListButton'
import Divider from '@components/elements/Divider'
import { useMapContext } from '@pages/Map/MapContext'

const AllTab = () => {
  const s = useStyles(createStyles)
  const { handleItemClick, allPoi, handleListScrollEnd } = useMapContext()

  return (
    <View style={s.container}>
      {(allPoi !== null && allPoi?.length != 0) && (
        <FlatList
          scrollEnabled={true}
          data={allPoi}
          scrollEventThrottle={16}
          onScrollEndDrag={handleListScrollEnd}
          ListFooterComponent={<Divider />}
          ItemSeparatorComponent={<Divider />}
          renderItem={({ item }) => (
            <React.Fragment>
              {item.type === 'river-station' && (
                <ListButton
                  key={item?.id}
                  text={item?.data?.riverName}
                  headline={item?.data?.label}
                  onPress={handleItemClick('river-station', item.data)}
                />
              )}

              {item.type === 'tidal-station' && (
                <ListButton
                  key={item?.id}
                  text={item?.data?.location}
                  headline={item?.data?.name}
                  onPress={handleItemClick('tidal-station', item.data)}
                />
              )}
            </React.Fragment>
          )}
        />
      )}

      {(allPoi == null || allPoi?.length == 0) && (
        <View style={s.center}>
          <EmptyState type='search-off' text='No Results' />
        </View>
      )}
    </View>
  )
}

export default AllTab

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
