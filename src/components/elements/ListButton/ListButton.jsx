import useStyles from '@hooks/useStyles'
import React from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'

import KeyboardRightIcon from '@assets/icons/keyboard-right.svg'
import Text from '../Text'

const ListButton = ({ headline = 'Headline', text = 'Example here', onPress = null, loading = false }) => {
  const s = useStyles(createStyles)

  return (
    <TouchableOpacity
      activeOpacity={onPress ? .8 : 1}
      onPress={onPress}
      style={s.container}>

      <View style={s.textWrapper}>
        <Text numberOfLines={1}>{headline}</Text>
        {text && <Text type='body' color='text2' numberOfLines={1}>{text}</Text>}
      </View>

      {onPress && (
        loading
          ? <ActivityIndicator />
          : <KeyboardRightIcon style={s.icon} />
      )}
    </TouchableOpacity>
  )
}

const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: vars.unit * 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: vars.unit * .5,
      paddingLeft: vars.unit,
    },
    textWrapper: {
      width: '92%',
    },
    icon: {
      height: undefined,
      aspectRatio: 1,
      width: vars.unit * 2.25,
      fill: colors.text2
    }
  })
}

export default ListButton
