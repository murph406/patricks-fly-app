import React from 'react'

import { FlatList, StyleSheet, View } from 'react-native'

import Section from '@components/elements/Section'
import useStyles from '@hooks/useStyles'

const HorizontalList = ({ label = 'label', data = null, minHeight, loading, renderItem, listEmptyComponent, listFooterComponent, onPressAll }) => {
  const s = useStyles(createStyles)

  return (
    <Section
      label={label}
      loading={loading}
      minHeight={minHeight}
      onPressAll={onPressAll}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        contentContainerStyle={s.contentContainer}
        ItemSeparatorComponent={<View style={s.separator} />}
        ListHeaderComponent={<View style={s.separator} />}
        ListFooterComponent={listFooterComponent || <View style={s.separator} />}
        ListEmptyComponent={listFooterComponent ? null : listEmptyComponent}
      />
    </Section>
  )
}

const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    contentContainer: {
      flexGrow: 1, 
      paddingBottom: vars.half * 1.3
    },
    separator: {
      width: vars.unit,
      height: vars.unit,
    }
  })
}

export default HorizontalList
