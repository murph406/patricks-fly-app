import React from 'react'

import { StyleSheet, Text as ReactText, Platform } from 'react-native'

import useStyles from '@hooks/useStyles'

const Text = ({
  style,
  color = 'text',
  type = 'default',
  ...rest
}) => {
  const s = useStyles(createStyles)

  return (
    <ReactText
      maxFontSizeMultiplier={1}
      style={[s[type], style, {
        color: s[color], 
      }]}
      {...rest}
    />
  )
}

const createStyles = (theme) => {
  const { colors } = theme

  return StyleSheet.create({
    body: {
      fontSize: 12,
      letterSpacing: .65,
      fontFamily: 'LatoFont',
    },
    bodyBold: {
      fontSize: 12,
      letterSpacing: .65,
      fontFamily: 'LatoFontBold',
    },
    default: {
      fontSize: 14,
      letterSpacing: 1,
      fontWeight: '600',
    },
    defaultBold: {
      fontSize: 14,
      letterSpacing: 1,
      fontFamily: 'LatoFontBold',
    },
    title: {
      fontSize: 25,
      letterSpacing: .65,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 21,
      letterSpacing: .65,
      fontWeight: 'bold',
    },
    headline: {
      fontSize: 21,
      letterSpacing: .65,
      textTransform: 'uppercase',
      fontFamily: Platform.OS === 'ios' ? 'FuturaFont' : 'LatoFontBold',
    },
    link: {
      fontSize: 16,
      letterSpacing: .65,
    },
    text: colors.text,
    text2: colors.text2,
    green: colors.green,
    red: colors.red,
    white: colors.white,
  })
}

export default Text
