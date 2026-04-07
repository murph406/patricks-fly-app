import Divider from '@components/elements/Divider'
import { useThemeContext } from '@stores/ThemeContext'
import React from 'react'
import { StyleSheet, View, Dimensions, Animated, PanResponder } from 'react-native'
import { EventEmitter } from '@utils/Structures'

const { height } = Dimensions.get('window')
const MAX_DOWNWARD_TRANSLATE_Y = 0

const DraggableDrawer = React.forwardRef(function DraggableDrawer({ children, headerComponent, initialOpen = true, headerPanHandlersEnabled = true, bodyPanHandlersEnabled = false, maxHeight = 500, minHeight = 0 }, ref) {
  const theme = useThemeContext()
  const emitterRef = React.useRef(new EventEmitter())
  const s = React.useMemo(() => createStyles(theme), [theme])
  const [isOpen, setIsOpen] = React.useState(initialOpen)

  const grabberHeight = React.useMemo(() => theme.vars.unit * 3, [theme])
  const maxUpwardTranslateY = React.useMemo(() => (minHeight + grabberHeight) - maxHeight, [minHeight, grabberHeight, maxHeight])
  const scrollTopBoundary = React.useMemo(() => height - maxHeight, [maxHeight])

  const scrollViewRef = React.useRef()
  const lastDy = React.useRef(initialOpen ? maxUpwardTranslateY : MAX_DOWNWARD_TRANSLATE_Y)
  const lastScrollDy = React.useRef(new Animated.Value(0))
  const animatedValue = React.useRef(new Animated.Value(initialOpen ? maxUpwardTranslateY : MAX_DOWNWARD_TRANSLATE_Y))

  const interpolators = React.useMemo(() => {
    return {
      translateY: animatedValue.current.interpolate({
        inputRange: [maxUpwardTranslateY, MAX_DOWNWARD_TRANSLATE_Y],
        outputRange: [maxUpwardTranslateY, MAX_DOWNWARD_TRANSLATE_Y],
        extrapolate: 'clamp'
      }),
      scrollContainerOpacity: animatedValue.current.interpolate({
        inputRange: [maxUpwardTranslateY, MAX_DOWNWARD_TRANSLATE_Y],
        outputRange: [1, 1],
        extrapolate: 'clamp'
      })
    }
  }, [maxUpwardTranslateY, MAX_DOWNWARD_TRANSLATE_Y])

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dy, dx, moveY } = gestureState

        if (Math.abs(dx) > 7) return false // Horizontal Swipes
        if (lastDy.current === maxUpwardTranslateY && dy < 0) return false
        if (lastScrollDy.current._value > 0 && moveY > scrollTopBoundary) return false
        return true
      },
      onPanResponderGrant: () => animatedValue.current.setOffset(lastDy.current),
      onPanResponderMove: (_, gestureState) => animatedValue.current.setValue(gestureState.dy),
      onPanResponderRelease: (_, gestureState) => {
        animatedValue.current.flattenOffset()
        lastDy.current += gestureState.dy

        if (lastDy.current < maxUpwardTranslateY) lastDy.current = maxUpwardTranslateY
        else if (lastDy.current > MAX_DOWNWARD_TRANSLATE_Y) lastDy.current = MAX_DOWNWARD_TRANSLATE_Y
        if (gestureState.dy > 0) {
          ref.current.close()
          setIsOpen(false)
        } else {
          ref.current.open()
          setIsOpen(true)
        }
      }
    })
  )

  React.useImperativeHandle(ref, () => {
    const animationConfig = {
      useNativeDriver: false,
      friction: 25,
      tension: 80,
    }

    return {
      on: (event, callback) => emitterRef.current.on(event, callback),
      off: (event, callback) => emitterRef.current.off(event, callback),
      emit: (event, data) => emitterRef.current.emit(event, data),
      open: () => {
        lastDy.current = maxUpwardTranslateY
        setIsOpen(true)
        Animated.spring(animatedValue.current, {
          ...animationConfig,
          toValue: lastDy.current
        }).start()
      },
      close: () => {
        lastDy.current = MAX_DOWNWARD_TRANSLATE_Y
        setIsOpen(false)
        Animated.spring(animatedValue.current, {
          ...animationConfig,
          toValue: lastDy.current,
        }).start(() => {
          if (lastScrollDy.current._value !== 0) scrollViewRef.current.scrollTo({ x: 0, y: 0 })
        })
      }
    }
  }, [])

  React.useEffect(() => emitterRef.current.emit('open', isOpen), [isOpen])

  return (
    <Animated.View
      style={[
        s.container,
        {
          height: maxHeight,
          bottom: maxUpwardTranslateY,
          transform: [{ translateY: interpolators.translateY }]
        }
      ]}>

      {headerPanHandlersEnabled && (
        <React.Fragment>
          <View  {...panResponder.current.panHandlers} style={s.grabberContainer}>
            <View style={[s.grabber, { height: grabberHeight }]} />
          </View>
        </React.Fragment>
      )}

      <View {...(headerPanHandlersEnabled ? panResponder.current.panHandlers : {})}>
        {headerPanHandlersEnabled && <Divider />}
        {headerComponent}
        {headerPanHandlersEnabled && <Divider />}
      </View>

      <Animated.View {...(bodyPanHandlersEnabled ? panResponder.current.panHandlers : {})} style={{ flex: 1, opacity: interpolators.scrollContainerOpacity }}>
        {children}
      </Animated.View>
    </Animated.View>
  )
})

export default DraggableDrawer

const createStyles = (theme) => {
  const { vars, colors } = theme

  return StyleSheet.create({
    container: {
      position: 'absolute',
      right: 0,
      left: 0,
      zIndex: 100,
      flex: 1,
      backgroundColor: colors.surface,
      borderTopRightRadius: vars.unit * 2,
      borderTopLeftRadius: vars.unit * 2,
    },
    chevronContainer: {
      zIndex: 1000,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible'
    },
    grabberContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    grabber: {
      width: vars.unit * 4,
      maxHeight: vars.unit * .5,
      borderRadius: vars.unit,
      backgroundColor: colors.surface4
    }
  })
}

