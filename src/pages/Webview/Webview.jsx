import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import WebView from "react-native-webview"

import ImageView from '@components/layouts/ImageView'
import useStyles from '@hooks/useStyles'
import useNavigatePage from '@hooks/useNavigatePage'

const Webview = (props) => {
  const containerRef = React.useRef(null)
  const webviewRef = React.useRef()
  const { headlineText, url } = props.route.params

  const navigatePage = useNavigatePage(createStyles)
  const s = useStyles(createStyles)

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />

      <ImageView
        allowLandscape
        ref={containerRef}
        text={headlineText}
        onPressBack={navigatePage()}>
        <React.Fragment>
          <View style={s.container}>
            <WebView
              ref={webviewRef}
              style={{ flex: 1 }}
              source={{ uri: url }}
            />
          </View>
        </React.Fragment>
      </ImageView>
    </React.Fragment >
  )
}

const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
      borderTopRightRadius: vars.radius.lg,
      borderTopLeftRadius: vars.radius.lg,
      overflow: 'hidden'
    },
  })
}


export default Webview
