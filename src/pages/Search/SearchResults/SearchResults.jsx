import React from 'react'

import { KeyboardAvoidingView, StyleSheet, Animated, Platform, ScrollView } from 'react-native'

import StatusBar from '@components/layouts/StatusBar'
import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'

import { useSearchContext } from '../SearchContext'

const SearchResults = () => {
  const { searchBarRef } = useSearchContext()
  const s = useStyles(createStyles)

  const [focused, setFocused] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState(null)

  const isResultsVisible = React.useMemo(() => {
    let flag = false

    if (focused || (searchValue != null && searchValue?.length != 0)) flag = true
    return flag
  }, [focused, searchValue])

  const animation = useAnimation({ doAnimation: isResultsVisible })
  const innerAnimation = useAnimation({ doAnimation: isResultsVisible, duration: 650 })

  const interpolations = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    innerOpacity: innerAnimation.interpolate({
      inputRange: [0, .95, 1],
      outputRange: [0, 0, 1],
    })
  }



  React.useEffect(() => {
    searchBarRef.current?.on('focus', setFocused)
    return () => searchBarRef.current?.off('focus', setFocused)
  }, [])

  React.useEffect(() => {
    searchBarRef.current?.on('change', setSearchValue)
    return () => searchBarRef.current?.off('change', setSearchValue)
  }, [])


  return (
    <Animated.View style={[s.container, { opacity: interpolations.opacity, zIndex: isResultsVisible ? 1 : -1 }]}>
      <StatusBar />
      <KeyboardAvoidingView style={s.inner} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={s.scrollViewContent} />
      </KeyboardAvoidingView >
    </Animated.View >
  )
}

const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.surface2
    },
    inner: {
      flex: 1,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      minHeight: vars.unit * 23
    },
    centerFill: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      minHeight: vars.unit * 35
    },
    body: {
      flex: 1,
      paddingBottom: vars.unit,
    },
    scrollViewContent: {
      flex: 1,
      paddingBottom: vars.double,
    },
    footer: {
      paddingBottom: vars.unit * 5
    }
  })
}

export default SearchResults
