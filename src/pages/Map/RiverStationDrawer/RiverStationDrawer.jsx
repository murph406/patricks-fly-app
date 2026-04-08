import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { format, parseISO } from 'date-fns'

import DraggableDrawer from '@components/composites/DraggableDrawer'
import useStyles from '@hooks/useStyles'
import { useMapContext } from '@pages/Map/MapContext'
import Divider from '@components/elements/Divider'
import WaterIcon from '@assets/icons/water.svg'
import DrawerHeader from '@components/composites/DrawerHeader'
import { useRiverFlow } from '@hooks/useRiverFlow'
import Section from '@components/elements/Section'
import RiverFlowChart from '@features/rivers/RiverFlowChart'

const RiverStationDrawer = () => {
    const { selected, setSelected, riverDrawerRef, mainDrawerRef, DEFAULT_DRAWER_HEIGHT } = useMapContext()
    const s = useStyles(createStyles, { DEFAULT_DRAWER_HEIGHT })

    const { label, riverName, id } = selected
    const riverFlow = useRiverFlow(id)

    const lastObserved = React.useMemo(() => {
        if (riverFlow?.observed?.issuedTime) return format(parseISO(riverFlow.observed.issuedTime), 'MMM d, h:mm a')
        return null
    }, [riverFlow])

    React.useEffect(() => {
        if (selected?.type === 'river-station') riverDrawerRef.current.open()
        else riverDrawerRef.current.close()
    }, [selected])

    function close() {
        setSelected({})
        setTimeout(() => mainDrawerRef.current.open(), 150)
    }

    return (
        <DraggableDrawer
            initialOpen={false}
            ref={riverDrawerRef}
            maxHeight={s.maxDrawerHeight}
            minHeight={s.minDrawerHeight}
            headerPanHandlersEnabled={false}>
            <View style={s.container}>
                <View style={s.header}>
                    <DrawerHeader
                        headline={label}
                        onClose={close}
                        description={riverName}
                        headerComponent={
                            <View activeOpacity={1} style={s.logoContainer}>
                                <WaterIcon style={s.logo} />
                            </View>
                        }
                    />

                    <Divider />
                </View>

                <ScrollView >
                    <View style={s.body}>
                        <Section label='Flow Chart' suffix={lastObserved && `Updated ${lastObserved}`}>
                            <RiverFlowChart {...riverFlow} />
                        </Section>
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

export default RiverStationDrawer
