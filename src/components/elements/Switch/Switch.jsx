import useStyles from '@hooks/useStyles'
import React from 'react'

import { Switch as ReactSwitch, StyleSheet } from 'react-native'

const Switch = (props) => {
  const { value, onChange } = props
  const s = useStyles(createStyles)

  return (
    <ReactSwitch
      value={value}
      style={s.container}
      trackColor={{ false: s.disabled, true: s.active }}
      ios_backgroundColor={s.disabled}
      onValueChange={onChange}
    />
  )
}

const createStyles = (theme) => {
  const { colors } = theme

  return StyleSheet.create({
    active: colors.brand,
    disabled: colors.surface4,
  })
}



export default Switch
