import SearchBar from '@components/elements/SearchBar'
import useStyles from '@hooks/useStyles'
import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'
import { useSearchContext } from '../SearchContext'

const KeyboardSearch = () => {
  const { searchBarRef } = useSearchContext()
  const [search, setSearch] = React.useState('')

  const s = useStyles(createStyles)

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <SearchBar
        ref={searchBarRef}
        value={search}
        onChange={setSearch}
      />

      <View style={s.spacer} />

    </KeyboardAvoidingView>
  )
}

const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: vars.unit,
      right: vars.unit,
      zIndex: 1000
    },
    spacer: {
      height: vars.unit,
      width: vars.unit,
    }
  })
}


export default KeyboardSearch
