import React from 'react'

import { StyleSheet } from 'react-native'

import useDimensions from "@hooks/useDimensions"
import { useThemeContext } from '@stores/ThemeContext'

function useStyles(callback = () => StyleSheet.create({}), props) {
    const theme = useThemeContext()
    const dimensions = useDimensions()
    
    return React.useMemo(() => callback(theme, dimensions, props), [theme, dimensions, props])
}

export default useStyles
