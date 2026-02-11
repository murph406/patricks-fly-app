import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'

import ImageView from '@components/layouts/ImageView'
import Text from '@components/elements/Text'
import useStyles from '@hooks/useStyles'
import useNavigatePage from '@hooks/useNavigatePage'

const Settings = () => {
  const containerRef = React.useRef(null)
  const navigatePage = useNavigatePage(createStyles)
  const s = useStyles(createStyles)

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />

      <ImageView
        text='Settings'
        onPressBack={navigatePage()}
        ref={containerRef}>
        <View style={s.container}>
          <Text>Settings</Text>
        </View>
      </ImageView>
    </React.Fragment>
  )
}

const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: vars.unit,
      padding: vars.unit,
    },
  })
}


export default Settings
