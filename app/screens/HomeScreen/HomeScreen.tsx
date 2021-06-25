import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import Button from '../../components/_common/Button'
import Input from '../../components/_common/Input'
import { baseline, colors } from '../../theme'
import { useNavigation } from '@react-navigation/core'
import { ScreenRoute } from '../../navigation/constants'
import { ScreenParams } from '../../navigation/mainNavigation'

const HomeScreen: React.FC = () => {

  const navigation = useNavigation()
  const [timeLimit, setTimeLimit] = useState('600')

  const onPressStart = async () => {
    const converted = +timeLimit * 1000
    const params: ScreenParams[ScreenRoute.QUIZ] = {
      timeLimit: converted
    }
    navigation.navigate(ScreenRoute.QUIZ, params)
  }

  const padding = baseline

  return (
    <View style={{ padding }}>
      <SafeAreaView>
        <Text style={{ marginBottom: baseline / 2, color: colors.background.onColor }}>Time limit</Text>
        <Input containerPadding={padding} style={{ marginBottom: baseline }} value={timeLimit} onChange={setTimeLimit} />
        <Button containerPadding={padding} title="Start" onPress={onPressStart} />
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen