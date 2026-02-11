import React from 'react'

import { TouchableOpacity } from 'react-native'

import Text from '../Text'

const TextButton = (props) => {
  const { onPress } = props

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={.75}>
      <Text {...props} />
    </TouchableOpacity>
  )
}

export default TextButton
