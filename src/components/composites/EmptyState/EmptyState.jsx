import React from 'react'

import { StyleSheet, View } from 'react-native'

import InfoIcon from '@assets/icons/info.svg'
import SearchIcon from '@assets/icons/search.svg'
import SearchOffIcon from '@assets/icons/search-off.svg'
import Text from '@components/elements/Text'
import useStyles from '@hooks/useStyles'

const EmptyState = ({ text = 'No Results', type, fill }) => {
  const s = useStyles(createStyles)

  const icon = React.useMemo(() => {
    switch (type) {
      case 'search-off':
        return (
          <SearchOffIcon
            fill={s.text2}
            height={s.icon.height}
            width={s.icon.width}
          />
        )
      case 'search':
        return (
          <SearchIcon
            fill={s.text2}
            height={s.icon.height}
            width={s.icon.width}
          />
        )
      default:
        return (
          <InfoIcon
            fill={s.text2}
            height={s.icon.height * .9}
            width={s.icon.width * .9}
          />
        )
    }
  }, [type])

  return (
    <View style={[s.container, fill && s.filled]}>
      {icon}
      <Text type='body'>{text}</Text>
    </View>
  )
}

const createStyles = (theme) => {
  const { vars, colors } = theme
  const icon = vars.unit * 2

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: vars.unit * .45
    },
    filled: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      minHeight: vars.unit * 12.5
    },
    icon: {
      height: icon,
      width: icon,
    },
    text2: colors.text2
  })
}

export default EmptyState
