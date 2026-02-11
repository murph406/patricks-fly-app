import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import useStyles from '@hooks/useStyles'
import Tab from '@components/elements/Tab'

const TabPicker = ({ tabs = [], activeIndex = 0, onChange, }) => {
  const s = useStyles(createStyles)

  function handleChange(index) {
    return () => onChange?.(index)
  }

  return (
    <View style={s.container}>
      <FlatList
        horizontal
        data={tabs}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={<View style={s.break} />}
        ListHeaderComponent={<View style={s.break} />}
        ListFooterComponent={<View style={s.break} />}
        renderItem={({ item, index }) => (
          <Tab
            text={item}
            color={activeIndex === index ? 'brand' : 'surface4'}
            onPress={handleChange(index)} />
        )}
      />
    </View>
  )
}

const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    container: {
      gap: vars.unit,
      paddingTop: vars.unit,
      paddingBottom: vars.unit,
      height: 5 * vars.unit,
    },
    break: {
      height: 1,
      width: vars.unit
    }
  })
}

export default TabPicker
