import React from 'react'

import { ScrollView, StyleSheet } from 'react-native'

import View from '@components/elements/View'

import Header from './Header'
import useStyles from '@hooks/useStyles'
import KeyboardSearch from './KeyboardSearch'
import Section from '@components/elements/Section'
import Divider from '@components/elements/Divider'
import ListButton from '@components/elements/ListButton'
import useNavigatePage from '@hooks/useNavigatePage'
import SearchResults from './SearchResults'
import { SearchProvider } from './SearchContext'
import { PATRICKS_FLY_SHOP_URL } from '@utils/Vars'

const Search = () => {
  const navigatePage = useNavigatePage()
  const s = useStyles(createStyles)

  function handleNavUrl(headlineText, url) {
    return navigatePage('webview', {
      headlineText,
      url
    })
  }

  return (
    <View style={s.container}>
      <Header />
      <ScrollView style={s.body}>
        <Section label='More'>
          <Divider />

          <ListButton
            text={null}
            headline='Settings'
            onPress={navigatePage('settings')}
          />

          <Divider />

          <ListButton
            text={null}
            headline="The Shop"
            onPress={handleNavUrl("Patrick's Fly Shop", PATRICKS_FLY_SHOP_URL)}
          />

          <Divider />

          <ListButton
            text={null}
            headline="Leave a Review"
            onPress={handleNavUrl('Leave a Review', 'https://developer.apple.com/documentation/storekit/requesting-app-store-reviews')}
          />
          <Divider />
        </Section>
      </ScrollView>

      <SearchResults />
      <KeyboardSearch />
    </View>
  )
}

const createStyles = (theme) => {
  const { vars } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      paddingVertical: vars.double,
      gap: vars.double
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    recentsMinHeight: vars.unit * 23,
    shortcutsMinHeight: vars.unit * 15
  })
}

const SearchPage = (props) => {
  return (
    <SearchProvider {...props}>
      <Search />
    </SearchProvider>
  )
}

export default SearchPage
