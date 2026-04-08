import React from 'react'

import { StyleSheet, View } from 'react-native'

import CloseIcon from '@assets/icons/close.svg'
import IconButton from '@components/elements/IconButton'
import Text from '@components/elements/Text'
import useStyles from '@hooks/useStyles'

const DrawerHeader = ({ headline = '', description = '', headerComponent, onClose }) => {
  const s = useStyles(createStyles)

  return (
    <View style={s.container}>
      <View style={onClose && s.row}>
        {headerComponent}

        <View style={s.center}>
          <Text type='subtitle' numberOfLines={1}>{headline}</Text>
          {description && <Text numberOfLines={1} type='body' color='text2'>{description}</Text>}
        </View>
      </View>

      {onClose && (
        <IconButton
          color={s.iconTheme}
          onPress={onClose}
          icon={<CloseIcon />}
        />
      )}
    </View>
  )
}

export default DrawerHeader

const createStyles = (theme, dimensions) => {
  const { vars, colorScheme } = theme
  const { width } = dimensions
  const isDarkMode = colorScheme === 'dark'

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      maxWidth: width,
      gap: vars.double,
      overflow: 'hidden'
    },
    center: {
      position: 'relative',
    },
    iconTheme: isDarkMode ? 'white' : 'surface3',
    row: {
      position: 'relative',
      flexDirection: 'row',
      gap: vars.unit,
      maxWidth: width - vars.unit * 10
    }

  })
}
