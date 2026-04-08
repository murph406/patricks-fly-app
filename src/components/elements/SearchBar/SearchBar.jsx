import React from 'react'

import { StyleSheet, TextInput, TouchableOpacity, View, Animated } from 'react-native'

import CloseIcon from '@assets/icons/close.svg'
import SearchIcon from '@assets/icons/search.svg'
import useAnimation from '@hooks/useAnimation'
import useStyles from '@hooks/useStyles'
import { EventEmitter } from '@utils/Structures'

const SearchBar = React.forwardRef(function SearchBar(props, ref) {
  const { value = null, colors = 'surface1', placeholder = 'Search...', size = 'lg', returnKeyType = 'done', onChange } = props
  const inputRef = React.useRef(null)
  const emitterRef = React.useRef(new EventEmitter())
  const [focused, setFocused] = React.useState(false)
  const [inputPressed, setInputPressed] = React.useState(false)
  const [buttonPressed, setButtonPressed] = React.useState(false)
  const toggleInputPressed = () => setInputPressed((prev) => !prev)
  const toggleButtonPressed = () => setButtonPressed((prev) => !prev)

  const s = useStyles(createStyles, { size })
  const inputAnimation = useAnimation({ doAnimation: inputPressed })
  const buttonAnimation = useAnimation({ doAnimation: buttonPressed })
  const focusAnimation = useAnimation({ doAnimation: focused })
  const interpolations = {
    inputScale: inputAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .975],
    }),
    buttonScale: buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .945],
    }),
    searchIconOpacity: focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    closeIconOpacity: focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })
  }

  React.useImperativeHandle(ref, () => {
    return {
      get input() { return inputRef.current },
      get focused() { return focused },
      blur: () => inputRef.current.blur(),
      focus() { return inputRef.current.focus },
      on: (event, callback) => emitterRef.current.on(event, callback),
      off: (event, callback) => emitterRef.current.off(event, callback),
      emit: (event, data) => emitterRef.current.emit(event, data),
    }
  }, [])

  React.useEffect(() => emitterRef.current.emit('focus', focused), [focused])
  React.useEffect(() => emitterRef.current.emit('change', value), [value])

  function handleOnPress() {
    onChange?.("")
    if (focused) inputRef.current?.blur()
    else inputRef.current?.focus()
  }

  function handleOnPressInput() {
    inputRef.current?.focus()
  }

  function onFocus() {
    setFocused(true)
  }

  function onBlur() {
    setFocused(false)
  }

  function onClear() {
    onChange?.("")
  }

  return (
    <View style={s.container} >
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleOnPressInput}
        onPressIn={toggleInputPressed}
        onPressOut={toggleInputPressed}
        style={[s.inputWrapper, s[colors], {
          transform: [{ scale: interpolations.inputScale }]
        }]}>

        <TextInput
          ref={inputRef}
          value={value}
          style={s.input}
          onBlur={onBlur}
          onFocus={onFocus}
          pointerEvents="none"
          maxFontSizeMultiplier={1}
          placeholder={focused ? 'Type to search...' : placeholder}
          returnKeyType={returnKeyType}
          placeholderTextColor={s.placeholderTextColor}
          selectionColor={s.input.color}
          onChangeText={onChange}
        />

        {(value?.length !== 0 && value !== null) && (
          <TouchableOpacity
            onPress={onClear}
            onPressIn={toggleInputPressed}
            onPressOut={toggleInputPressed}
            style={s.exitButtonContainer}
            activeOpacity={.7}>
            <CloseIcon
              height={s.exitIcon.height}
              width={s.exitIcon.width}
              fill={s.exitIcon.fill}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={handleOnPress}
        onPressIn={toggleButtonPressed}
        onPressOut={toggleButtonPressed}
        style={[s.searchButton, {
          transform: [{ scale: interpolations.buttonScale }]
        }]}>

        <Animated.View style={[s.searchButtonInner, { opacity: interpolations.searchIconOpacity }]}>
          <SearchIcon
            height={s.searchIcon.height}
            width={s.searchIcon.width}
            fill={s.searchIcon.fill}
          />
        </Animated.View>

        <Animated.View style={[s.searchButtonInner, { opacity: interpolations.closeIconOpacity }]}>
          <CloseIcon
            height={s.searchIcon.height}
            width={s.searchIcon.width}
            fill={s.searchIcon.fill}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
})

const createStyles = (theme, _, props) => {
  const { vars, colors } = theme
  const { size } = props

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: vars.unit,
    },
    inputWrapper: {
      flex: 1,
      borderRadius: vars.radius.xxl,
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      paddingLeft: vars.double,
      paddingRight: vars.unit,
      alignItems: 'center',
      height: vars.controls[size],
      backgroundColor: colors.surface4,
      gap: vars.half
    },
    input: {
      flex: 1,
      textAlign: 'left',
      fontSize: 14,
      letterSpacing: 1,
      fontWeight: '600',
      color: colors.text
    },
    placeholderTextColor: colors.text2,
    searchButton: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      height: vars.controls[size],
      width: vars.controls[size],
      backgroundColor: colors.surface4,
      borderRadius: vars.radius.xxl,
    },
    searchButtonInner: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    searchIcon: {
      fill: colors.text2,
      height: vars.unit * 1.85,
      width: vars.unit * 1.85,
    },
    exitButtonContainer: {
      backgroundColor: colors.surface5,
      height: vars.unit * 1.65,
      width: vars.unit * 1.65,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
    exitIcon: {
      fill: colors.text2,
      height: vars.unit * 1.2,
      width: vars.unit * 1.2
    },
  })
}


export default SearchBar
