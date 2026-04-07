import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import DraggableDrawer from '@components/composites/DraggableDrawer'
import useStyles from '@hooks/useStyles'
import { useMapContext } from '@pages/Map/MapContext'
import Divider from '@components/elements/Divider'
import TsunamiIcon from '@assets/icons/tsunami.svg'
import Text from '@components/elements/Text'
import DrawerHeader from '@components/composites/DrawerHeader'

const TidalDrawer = () => {
    const { selected, setSelected, tidalDrawerRef, mainDrawerRef, DEFAULT_DRAWER_HEIGHT } = useMapContext()
    const s = useStyles(createStyles, { DEFAULT_DRAWER_HEIGHT })

    const { name, location } = selected

    React.useEffect(() => {
        if (selected?.type === 'tidal-station') tidalDrawerRef.current.open()
        else tidalDrawerRef.current.close()
    }, [selected])

    function close() {
        setSelected({})
        setTimeout(() => mainDrawerRef.current.open(), 150)
    }

    return (
        <DraggableDrawer
            initialOpen={false}
            ref={tidalDrawerRef}
            maxHeight={s.maxDrawerHeight}
            minHeight={s.minDrawerHeight}
            headerPanHandlersEnabled={false}>
            <View style={s.container}>
                <View style={s.header}>
                    <DrawerHeader
                        headline={name}
                        onClose={close}
                        description={location}
                        headerComponent={
                            <View activeOpacity={1} style={s.logoContainer}>
                                <TsunamiIcon style={s.logo} />
                            </View>
                        } />
                    <Divider />
                </View>

                <ScrollView >
                    <View style={s.body}>
                        <View style={s.textWrapper}>
                            <Text>
                                <Text type='subtitle'>Location</Text>
                                <Text> </Text>
                            </Text>
                            <Text type='default' color='text2'>{location}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </DraggableDrawer>
    )
}

const createStyles = (theme, _, props) => {
    const { vars, colors } = theme
    const profileImageHeight = vars.unit * 3.5

    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: vars.unit,
            paddingHorizontal: vars.unit,
        },
        header: {
            gap: vars.unit,
        },
        body: {
            flex: 1,
            gap: vars.unit,
            paddingTop: vars.unit,
            paddingBottom: vars.unit,
        },
        logoContainer: {
            borderRadius: 100,
            height: profileImageHeight,
            backgroundColor: colors.blueSurface1,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            aspectRatio: 1,
        },
        logo: {
            minHeight: profileImageHeight * .75,
            minWidth: profileImageHeight * .75,
            fill: colors.blueSurface3,
        },
        textWrapper: {
            gap: vars.half
        },
        minDrawerHeight: -vars.unit * 3,
        maxDrawerHeight: props?.DEFAULT_DRAWER_HEIGHT
    })
}

export default TidalDrawer
