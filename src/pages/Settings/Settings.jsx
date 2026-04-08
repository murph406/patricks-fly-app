import React from 'react'

import { StatusBar, StyleSheet, View } from 'react-native'

import Section from '@components/elements/Section'
import Switch from '@components/elements/Switch'
import Text from '@components/elements/Text'
import ImageView from '@components/layouts/ImageView'
import useNavigatePage from '@hooks/useNavigatePage'
import useStyles from '@hooks/useStyles'
import { useUserContext } from '@stores/UserContext'

const Settings = () => {
  const containerRef = React.useRef(null)
  const navigatePage = useNavigatePage(createStyles)
  const s = useStyles(createStyles)

  const {
    locationPermissionStatus,
    notificationPermissionStatus,
    validateLocationsPermissions,
    validateNotificationPermissions
  } = useUserContext()

  const notificationsSwitchValue = React.useMemo(() => {
    if (notificationPermissionStatus?.status === 'granted') return true
    return false
  }, [notificationPermissionStatus])

  const locationsSwitchValue = React.useMemo(() => {
    if (locationPermissionStatus?.status === 'granted') return true
    return false
  }, [locationPermissionStatus])

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />

      <ImageView
        text='Settings'
        onPressBack={navigatePage()}
        ref={containerRef}>
        <View style={s.container}>

          <Section label='General'>
            <View style={s.sectionContainer}>
              <View style={s.row}>
                <Text type='defaultBold' color='text2'>Push Notifications</Text>

                <Switch
                  value={notificationsSwitchValue}
                  onChange={validateNotificationPermissions}
                />
              </View>

              <View style={s.row}>
                <Text type='defaultBold' color='text2'>Location Services</Text>

                <Switch
                  value={locationsSwitchValue}
                  onChange={validateLocationsPermissions}
                />
              </View>

            </View>
          </Section>
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
      gap: vars.double,
      paddingTop: vars.unit,
    },
    flex: {
      flex: 1
    },
    sectionContainer: {
      paddingHorizontal: vars.unit,
      gap: vars.unit,
    },
    row: {
      flexDirection: 'row',
      gap: vars.unit,
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  })
}


export default Settings
