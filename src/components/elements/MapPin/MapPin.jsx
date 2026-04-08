import React from 'react'

import { StyleSheet, Image } from 'react-native'

import { Marker, } from 'react-native-maps'

import useStyles from '@hooks/useStyles'

const MapPin = (props) => {
    const { title, description, coordinate } = props
    const s = useStyles(createStyles)

    return (
        <Marker
            useLegacyPinView
            title={title}
            style={s.container}
            description={description}
            coordinate={coordinate}
            pinColor={s.pinColor} />
    )
}

const createStyles = (theme) => {
    const { colors, vars } = theme
    const size = vars.unit * 3.25

    return StyleSheet.create({
        container: {
            flex: 1,
            width: size,
            height: size,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.brand,
            borderRadius: vars.radius.xlg,
        },
        icon: {
            height: size * .6,
            width: size * .6,
        },
        pinColor: colors.brand,
    })
}


export default MapPin
