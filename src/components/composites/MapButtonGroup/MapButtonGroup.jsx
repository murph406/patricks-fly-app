import React from 'react'
import { View } from 'react-native'

import MapButton from '@components/elements/MapButton'
import Section from '@components/elements/Section'
import { Vars } from '@constants/Vars'

const MapButtonGroup = ({ label, coordinate, enablePin = true, onPress }) => {
  return (
    <Section label={label}>
      <View style={{ paddingHorizontal: Vars.unit }}>
        <MapButton coordinate={coordinate} enablePin={enablePin} onPress={onPress} />
      </View>
    </Section>
  )
}
export default MapButtonGroup
