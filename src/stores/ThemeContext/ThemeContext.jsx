import React from 'react'

import { useColorScheme } from 'react-native'

import { useFonts } from 'expo-font'

import FuturaFront from "@assets/fonts/futura/futur.ttf"
import LatoFrontBold from "@assets/fonts/lato/bold-extra.ttf"
import LatoFront from "@assets/fonts/lato/bold.ttf"
import { Colors } from '@constants/Colors'
import { Vars } from '@constants/Vars'

const ThemeContext = React.createContext(null)

const APP_FONTS = {
  FuturaFont: FuturaFront,
  LatoFont: LatoFront,
  LatoFontBold: LatoFrontBold,
}

export const ThemeProvider = ({ children }) => {
  let colorScheme = useColorScheme()
  const [fontsLoaded] = useFonts(APP_FONTS)

  const colors = React.useMemo(() => {
    return {
      hf: Colors.hf,
      dark: Colors['dark'],
      light: Colors['light'],
      ...Colors[colorScheme]
    }
  }, [colorScheme])

  function getTeamTheme(id = 0) {
    let main = null
    let secondary = null

    switch (id) {
      case 0:
        main = Colors.hf.heatCheck
        secondary = Colors.hf.buzzer
        break
      case 1:
        main = Colors.hf.heatCheck
        secondary = Colors.hf.skyHook
        break
      case 2:
        main = Colors.hf.buzzer
        secondary = Colors.hf.heatCheck

        break
      case 3:
        main = Colors.hf.buzzer
        secondary = Colors.hf.skyHook

        break
      case 4:
        main = Colors.hf.skyHook
        secondary = Colors.hf.heatCheck

        break
      case 5:
        main = main = Colors.hf.skyHook
        secondary = Colors.hf.buzzer

        break
      default:
        main = colors.text2
        secondary = colors.surface5
        break
    }

    return {
      main,
      secondary
    }
  }

  function hslToHex(hsl) {
    const [h, s, l] = hsl.match(/\d+\.?\d*/g).map(Number)
    const sl = s / 100
    const ll = l / 100

    const a = sl * Math.min(ll, 1 - ll)
    const f = n => {
      const k = (n + h / 30) % 12
      const color = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }

    return `#${f(0)}${f(8)}${f(4)}`
  }

  const value = {
    colors,
    vars: Vars,
    colorScheme,
    getTeamTheme,
    hslToHex
  }

  return (
    <ThemeContext.Provider value={value}>
      {(fontsLoaded && (colorScheme === 'light' || colorScheme === 'dark')) && children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  return React.useContext(ThemeContext)
}
