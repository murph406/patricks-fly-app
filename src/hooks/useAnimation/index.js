import React from 'react'

import { Animated, Easing } from 'react-native'

function useAnimation(props) {
    const { doAnimation, duration = null } = props
    const [animation] = React.useState(new Animated.Value(0))

    React.useEffect(() => {
        if (duration) Animated.timing(animation, {
            toValue: doAnimation ? 1 : 0,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.exp)
        }).start()
        else Animated.spring(animation, {
            toValue: doAnimation ? 1 : 0,
            useNativeDriver: true,
        }).start()
    }, [doAnimation, duration])

    return animation
}

export default useAnimation