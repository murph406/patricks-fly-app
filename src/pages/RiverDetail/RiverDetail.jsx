import React from 'react'
import { StatusBar, StyleSheet, View, Image as RNImage } from 'react-native'

import ImageView from '@components/layouts/ImageView'
import Text from '@components/elements/Text'
import useStyles from '@hooks/useStyles'
import useNavigatePage from '@hooks/useNavigatePage'
import HorizontalList from '@components/composites/HorizontalList'
import RiverStationCard from '@features/rivers/RiverStationCard'
import MapButtonGroup from '@components/composites/MapButtonGroup'
import { GeoPoint } from '@utils/Structures'

const RiverDetail = ({ route }) => {
  const containerRef = React.useRef(null)
  const navigatePage = useNavigatePage()
  const s = useStyles(createStyles)

  const { name = '', state = '', description = '', image, subImage, lat, lng, stations = [] } = route.params

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />

      <ImageView
        maxHeight={175}
        backgroundImage={subImage}
        onPressBack={navigatePage()}
        ref={containerRef}>
        <React.Fragment>
          <View style={s.container}>

            <View style={s.headerWrapper}>
              <RNImage
                source={image}
                style={s.logoContainer}
              />

              <Text type='title' numberOfLines={1}>{name}, {state}</Text>
              <Text type='default'>{description}</Text>
            </View>

            <MapButtonGroup
              label='Location'
              coordinate={new GeoPoint(lat, lng)}
              onPress={navigatePage('map-detail', {
                type: 'river',
                headlineText: `${name}`,
                subHeader: state,
                body: description,
                coordinate: new GeoPoint(lat, lng)
              })}
            />

            <HorizontalList
              label='Stations'
              data={stations}
              renderItem={({ item }) => (
                <RiverStationCard {...item} key={item?.Id} onPress={navigatePage('river-station-detail', item)} />
              )}
            />

          </View>
        </React.Fragment>
      </ImageView>
    </React.Fragment >
  )
}

const createStyles = (theme) => {
  const { vars, colors, colorScheme } = theme
  const isDarkMode = colorScheme === 'dark'
  const profileImageHeight = vars.unit * 11

  return StyleSheet.create({
    container: {
      flex: 1,
      gap: vars.double,
      marginTop: -(profileImageHeight * .5),
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
    headerWrapper: {
      gap: vars.unit,
      paddingLeft: vars.unit,
      paddingRight: vars.unit,
    }
  })
}


export default RiverDetail
