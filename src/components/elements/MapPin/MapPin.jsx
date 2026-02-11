import React from 'react'

import { StyleSheet, Image } from 'react-native'
import useStyles from '@hooks/useStyles'
import { Marker, } from 'react-native-maps'

const MapPin = (props) => {
    const { title, description, coordinate } = props
    const s = useStyles(createStyles)

    return (
        <Marker
            title={title}
            style={s.container}
            description={description}
            coordinate={coordinate}
            pinColor={s.pinColor}/>
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
        pinColor: colors.white,
    })
}


export default MapPin
