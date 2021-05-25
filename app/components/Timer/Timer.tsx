import React, { useEffect, useRef, useState } from 'react'
import { Animated, ViewProps, Dimensions, SafeAreaView } from 'react-native'
import { Easing } from 'react-native-reanimated'
import { Player } from '../../types'
import { getPrettyTime } from '../../utils/time.utils'
import * as S from './styled'

type OwnProps = {
  active: boolean
  player: Player
  onTimerEnd: () => void
  rotated?: boolean
}

type Props = OwnProps & ViewProps

const { height } = Dimensions.get('screen')

const Timer: React.FC<Props> = ({ player, onTimerEnd, active, rotated, ...props }) => {
  const timeLeft = player.bank

  const timeAnimation = useRef(new Animated.Value(0)).current
  const elapsedTime = useRef(0)
  const [pretty, setPretty] = useState(getPrettyTime(timeLeft / 100))

  const countdown = () => {
    const duration = timeLeft - elapsedTime.current * 1000
    return Animated.timing(timeAnimation, {
      toValue: timeLeft / 1000,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false
    })
  }

  useEffect(() => {
    if (active) {
      timeAnimation.addListener(({ value }) => {
        elapsedTime.current = value
        const remaining = player.bank / 1000 - value
        const newPretty = getPrettyTime(remaining * 1000)
        setPretty(newPretty)
      })
      countdown().start(() => {
        const timedOut = elapsedTime.current * 1000 === timeLeft
        if (timedOut) {
          onTimerEnd()
        }
      })
    } else {
      countdown().stop()
    }

    return () => {
      timeAnimation.removeAllListeners()
    }

  }, [active])

  const fillHeight = timeAnimation.interpolate({
    inputRange: [0, timeLeft / 1000],
    outputRange: [height * 0.15, 0]
  })

  return (
    <S.Container active={active} rotated={rotated} {...props}>
      <Animated.View style={{ position: 'absolute', bottom: 0, height: fillHeight, backgroundColor: 'blue', width: '100%' }} />
      <S.TimeText>{pretty}</S.TimeText>
    </S.Container>
  )
}

export default Timer