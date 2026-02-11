import React from 'react'

import { ActivityIndicator, StyleSheet, View, Text as ReactText } from 'react-native'

import Text from '@components/elements/Text'
import TextButton from '@components/elements/TextButton'
import useStyles from '@hooks/useStyles'

const Section = ({ label = 'label', labelType = 'subtitle', minHeight = 0, suffix, loading, children, onPressAll }) => {
  const s = useStyles(createStyles, { minHeight })

  return (
    <View style={s.container}>
      <View style={[s.row, s.padding]}>
        <View style={s.row}>
          <ReactText>
            <Text type={labelType}>{label}</Text>
            <ReactText> </ReactText>
            {suffix && <Text type='defaultBold' color='text2' style={{ marginTop: s.half }}>{suffix}</Text>}
          </ReactText>
        </View>
        {onPressAll && <TextButton type='body' onPress={onPressAll}>View All</TextButton>}
      </View>

      {!loading
        ?
        <View style={s.body}>
          {children}
        </View>
        :
        <View style={[s.body, s.center]}>
          <ActivityIndicator />
        </View>
      }
    </View>
  )
}

const createStyles = (theme, _, props) => {
  const { vars } = theme
  const { minHeight } = props

  return StyleSheet.create({
    half: vars.half * .75,
    container: {
      alignItems: 'flex-start',
      width: '100%',
      gap: vars.unit,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: vars.half,
    },
    body: {
      flex: 1,
      width: '100%',
      overflow: 'visible',
      minHeight,
    },
    padding: {
      paddingLeft: vars.unit,
      paddingRight: vars.unit
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}

export default Section
