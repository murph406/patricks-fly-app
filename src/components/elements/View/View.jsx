import React from 'react'

import { StyleSheet, View as ReactView } from 'react-native'

import { useThemeContext } from '@stores/ThemeContext/ThemeContext'

const View = ({
  style,
  ...rest
}) => {
  const theme = useThemeContext()

  const themed = React.useMemo(() => StyleSheet.create({
    backgroundColor: theme.colors.surface
  }), [theme])

  return (
    <ReactView
      style={[
        styles.container,
        themed,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})


export default View
