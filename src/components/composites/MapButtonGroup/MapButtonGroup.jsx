import React from 'react'
import { View } from 'react-native'

import MapButton from '@components/elements/MapButton'
import Section from '@components/elements/Section'
import { Vars } from '@constants/Vars'

const MapButtonGroup = ({ label, onPress }) => {
  return (
    <Section label={label}>
      <View style={{ paddingHorizontal: Vars.unit }}>
        <MapButton onPress={onPress} />
      </View>
    </Section>
  )
}
export default MapButtonGroup
