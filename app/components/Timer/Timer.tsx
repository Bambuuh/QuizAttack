import React, { useEffect, useRef, useState } from 'react'
import { Animated, ViewProps, Dimensions } from 'react-native'
import { Easing } from 'react-native-reanimated'
import { Player } from '../../types'
import { getPrettyTime } from '../../utils/time.utils'
import * as S from './styled'

type OwnProps = {
  active: boolean
  player: Player
  rotated?: boolean
}

type Props = OwnProps & ViewProps

const { height } = Dimensions.get('screen')

const Timer: React.FC<Props> = ({ player, active, rotated, ...props }) => {
  const timeLeft = player.bank

  const timeAnimation = useRef(new Animated.Value(0)).current
  const [pretty, setPretty] = useState(getPrettyTime(timeLeft / 100))

  const countdown = Animated.timing(timeAnimation, {
    toValue: timeLeft / 1000,
    duration: timeLeft,
    easing: Easing.linear,
    useNativeDriver: false
  })

  useEffect(() => {
    if (active) {

      timeAnimation.addListener(({ value }) => {
        const remaining = player.bank / 1000 - value
        const newPretty = getPrettyTime(remaining * 1000)
        setPretty(newPretty)
      })
      countdown.start()
    } else {
      countdown.stop()
    }

    return () => {
      timeAnimation.removeAllListeners()
    }

  }, [active])

  const fillHeight = timeAnimation.interpolate({
    inputRange: [0, timeLeft / 1000],
    outputRange: [height / 4, 0]
  })

  return (
    <S.Container active={active} rotated={rotated} {...props}>
      <Animated.View style={{ position: 'absolute', bottom: 0, height: fillHeight, backgroundColor: 'blue', width: '100%' }} />
      <S.TimeText>{pretty}</S.TimeText>
    </S.Container>
  )
}

export default Timer