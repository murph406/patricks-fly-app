import React from 'react'

import { StatusBar, StyleSheet, View } from 'react-native'

import MapButtonGroup from '@components/composites/MapButtonGroup'
import Section from '@components/elements/Section'
import Text from '@components/elements/Text'
import ImageView from '@components/layouts/ImageView'
import TidalChart from '@features/tides/TidalChart'
import useNavigatePage from '@hooks/useNavigatePage'
import useStyles from '@hooks/useStyles'
import { useTidalFlow } from '@hooks/useTidalFlow'
import { GeoPoint } from '@utils/Structures'

const TidalStationDetail = ({ route }) => {
  const containerRef = React.useRef(null)
  const navigatePage = useNavigatePage(createStyles)
  const s = useStyles(createStyles)

  const { name = '', howToReach = '', image, lat, lng, id } = route.params
  const tidalFlow = useTidalFlow(id)

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />

      <ImageView
        backgroundImage={image}
        text={`${name} Station`}
        onPressBack={navigatePage()}
        ref={containerRef}>
        <React.Fragment>
          <View style={s.container}>

            <Section label='Tidal Chart'>
              <View style={s.sectionWrapper}>
                <TidalChart {...tidalFlow} />
              </View>
            </Section>

            <MapButtonGroup
              label='Location'
              coordinate={new GeoPoint(lat, lng)}
              onPress={navigatePage('map-detail', {
                type: 'station',
                headlineText: name,
                body: howToReach,
                subHeader: 'Tidal Station',
                coordinate: new GeoPoint(lat, lng),
                maxDrawerHeight: s.overrideMaxDrawerHeight
              })}
            />

            <Section label='How to Reach'>
              <View style={s.sectionWrapper}>
                <Text>{howToReach}</Text>
              </View>
            </Section>

          </View>
        </React.Fragment>
      </ImageView>
    </React.Fragment >
  )
}

const createStyles = (theme, dimensions) => {
  const { vars, colors, colorScheme } = theme
  const { height } = dimensions
  const isDarkMode = colorScheme === 'dark'
  const profileImageHeight = vars.unit * 11

  return StyleSheet.create({
    container: {
      flex: 1,
      gap: vars.double,
      paddingTop: vars.double,
      paddingBottom: vars.unit * 4,
    },
    logoContainer: {
      borderRadius: vars.unit,
      height: profileImageHeight,
      aspectRatio: 1.35,
      overflow: 'hidden',
      resizeMode: 'cover',
      backgroundColor: isDarkMode ? colors.light.surface : colors.light.surface3,
      marginLeft: vars.unit,
    },
    sectionWrapper: {
      gap: vars.unit,
      paddingLeft: vars.unit,
      paddingRight: vars.unit,
    },
    overrideMaxDrawerHeight: height * .35
  })
}


export default TidalStationDetail
