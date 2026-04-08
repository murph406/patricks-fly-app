import React from 'react'

import { ActivityIndicator, FlatList, Linking, Platform, ScrollView, StyleSheet } from 'react-native'

import EmptyState from '@components/composites/EmptyState'
import Divider from '@components/elements/Divider'
import ListButton from '@components/elements/ListButton'
import Section from '@components/elements/Section'
import View from '@components/elements/View'
import useNavigatePage from '@hooks/useNavigatePage'
import useStyles from '@hooks/useStyles'
import { APP_STORE_ID, PATRICKS_FLY_SHOP_URL, PLAY_STORE_ID } from '@utils/Vars'

import Header from './Header'
import KeyboardSearch from './KeyboardSearch'
import { SearchProvider, useSearchContext } from './SearchContext'
import SearchResults from './SearchResults'


const Search = () => {
  const { recents } = useSearchContext()

  const navigatePage = useNavigatePage()
  const s = useStyles(createStyles)

  function handleNavUrl(headlineText, url) {
    return navigatePage('webview', {
      headlineText,
      url
    })
  }

  function handleLinkForReview() {
    if (Platform.OS === 'ios') Linking.openURL(`https://apps.apple.com/app/apple-store/id${APP_STORE_ID}?action=write-review`)
    else Linking.openURL(`market://details?id=${PLAY_STORE_ID}`)
  }

  return (
    <View style={s.container}>
      <Header />
      <ScrollView style={s.body}>

        <Section label='Recents' minHeight={s.recentsMinHeight}>
          <React.Fragment>
            <Divider padding='p1' />

            {(recents != null && recents?.length !== 0) && (
              <FlatList
                data={recents}
                scrollEnabled={false}
                ItemSeparatorComponent={<Divider />}
                ListFooterComponent={<Divider />}
                renderItem={({ item = {}, index }) => {
                  return (
                    <ListButton
                      key={index}
                      headline={item?.Name}
                      text={item?.PlayersDisplay}
                      onPress={navigatePage('team-detail', item)}
                    />
                  )
                }}
              />
            )}

            {(recents != null && recents?.length == 0) && (
              <View style={s.center}>
                <EmptyState type='search-off' text='No Recents' />
              </View>
            )}

            {(recents == null) && (
              <View style={s.center}>
                <ActivityIndicator />
              </View>
            )}
          </React.Fragment>
        </Section>

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
            onPress={handleLinkForReview}
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
