import React from 'react'

import { StyleSheet } from 'react-native'


import DraggableDrawer from '@components/composites/DraggableDrawer'
import TabPicker from '@components/composites/TabPicker'
import SearchBar from '@components/elements/SearchBar'
import View from '@components/elements/View'
import useStyles from '@hooks/useStyles'
import { useMapContext } from '@pages/Map/MapContext'



import AllTab from './AllTab'
import MyPlacesTab from './MyPlacesTab'
import RiverTab from './RiverTab'
import TidalTab from './TidalTab'

const MainDrawer = () => {
    const s = useStyles(createStyles)
    const { search, mainDrawerRef } = useMapContext()
    const [activeTab, setActiveTab] = React.useState(0)


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

                    <TabPicker
                        tabs={['All', 'My Places', 'River Stations', 'Tidal Stations']}
                        activeIndex={activeTab}
                        onChange={setActiveTab}
                    />
                </React.Fragment>
            }>

            <View style={s.container}>
                {activeTab === 0 && <AllTab />}
                {activeTab === 1 && <MyPlacesTab />}
                {activeTab === 2 && <RiverTab />}
                {activeTab === 3 && <TidalTab />}
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
            paddingHorizontal: vars.unit,
            flex: 0,
        },
        container: {
            flex: 1,
        },
        center: {
            flex: 1,
            gap: vars.double,
            padding: vars.unit,
            justifyContent: 'center',
            alignItems: 'center',
        },
        minDrawerHeight: vars.unit * 5.5,
        maxDrawerHeight: height * .675
    })
}

export default MainDrawer
