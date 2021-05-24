import {useEffect, useRef} from 'react'
import {Animated, Easing} from 'react-native'

type Props = {
  duration: number
}

export const useCountdown = (duration: number) => {
  const elapsedTime = useRef(0)
  const animatedValue = useRef(new Animated.Value(0)).current
  const durationMilliseconds = duration * 1000

  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: duration,
      duration: durationMilliseconds,
      easing: Easing.linear,
      useNativeDriver: true,
    })
    animatedValue.addListener(({value}) => (elapsedTime.current = value))
    animation.start()
  }, [])

  return {elapsedTime, animatedValue}
}
