import React from 'react'

import { StyleSheet, View } from 'react-native'

import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  TabActions,
} from '@react-navigation/native'

import TabButton from './TabButton'
import useStyles from '@hooks/useStyles'


const TabNavigator = (props) => {
  const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, props)
  const styles = useStyles(createStyles)

  function onTabPress(route) {
    return () => {
      navigation.dispatch({
        ...TabActions.jumpTo(route.name),
        target: state.key,
        params: {
          focused: false,
        }
      })
    }
  }

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <View style={styles.container}>
        {state.routes.map((route, i) => {
          if (i !== state.index) return null
          return (
            <View
              key={route.key}
              style={{
                flex: 1,
                display: i === state.index ? 'flex' : 'none',
              }}>
              {descriptors[route.key].render()}
            </View>
          )
        })}
      </View>

      {state.routes.length !== 1 && (
        <View style={styles.tabs}>
          <View style={styles.tabsWrapper}>
            {state.routes.map((route, i) => {
              return (
                <TabButton
                  key={`${i}`}
                  route={route}
                  active={i === state.index}
                  onPress={onTabPress(route)}
                />
              )
            })}
          </View>
        </View>
      )}
    </NavigationHelpersContext.Provider>
  )
}


const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      flex: 1
    },
    tabs: {
      zIndex: 1000,
      backgroundColor: colors.surface2,
      borderColor: colors.surface4,
      borderTopWidth: vars.lineHeight
    },
    tabsWrapper: {
      height: vars.unit * 5,
      paddingBottom: vars.unit,
      justifyContent: "center",
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}


export default TabNavigator
