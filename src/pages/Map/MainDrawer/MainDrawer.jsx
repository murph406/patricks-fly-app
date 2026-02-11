
import { StyleSheet } from 'react-native'

import View from '@components/elements/View'
import DraggableDrawer from '@components/composites/DraggableDrawer'
import useStyles from '@hooks/useStyles'
import SearchBar from '@components/elements/SearchBar'
import { useMapContext } from '@pages/Map/MapContext'
import React from 'react'
import Text from '@components/elements/Text'


const MainDrawer = () => {
    const s = useStyles(createStyles)
    const { search, mainDrawerRef } = useMapContext()

    React.useEffect(() => {
        search.ref.current.on('focus', (flag) => {
            if (flag) mainDrawerRef.current.open()
        })
    }, [])

    React.useEffect(() => {
        mainDrawerRef.current.on('open', (flag) => {
            if (!flag) search.ref.current.blur()
        })
    }, [])

    return (
        <DraggableDrawer
            ref={mainDrawerRef}
            initialOpen={false}
            bodyPanHandlersEnabled
            maxHeight={s.maxDrawerHeight}
            minHeight={s.minDrawerHeight}
            headerComponent={
                <React.Fragment>
                    <View style={s.searchWrapper}>
                        <SearchBar
                            ref={search.ref}
                            value={search.value}
                            onChange={search.set}
                        />
                    </View>
                </React.Fragment>
            }>

            <View style={s.container}>
                <Text>We could do something here...</Text>
            </View>
        </DraggableDrawer>
    )
}

const createStyles = (theme, dimensions) => {
    const { height } = dimensions
    const { vars } = theme

    return StyleSheet.create({
        searchWrapper: {
            paddingTop: vars.unit,
            paddingBottom: vars.unit + 2,
            paddingHorizontal: vars.unit,
            flex: 0,
        },
        container: {
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center'
        },
        minDrawerHeight: vars.unit * 6,
        maxDrawerHeight: height * .675
    })
}

export default MainDrawer
