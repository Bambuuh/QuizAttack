import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Button from '../../components/_common/Button'
import Input from '../../components/_common/Input'
import { baseline } from '../../theme'
import { useNavigation } from '@react-navigation/core'
import { HomeStackParams } from '../../navigation/home'
import { ScreenRoute } from '../../navigation/constants'

const HomeScreen: React.FC = () => {

  const navigation = useNavigation()
  const [timeLimit, setTimeLimit] = useState('60')

  const onPressStart = async () => {
    const converted = +timeLimit * 1000
    const params: HomeStackParams[ScreenRoute.QUIZ] = {
      timeLimit: converted
    }
    navigation.navigate(ScreenRoute.QUIZ, params)
  }

  return (
    <View style={{ padding: baseline }}>
      <Text style={{ marginBottom: baseline * 2 }}>HOME SCREEN</Text>
      <Text style={{ marginBottom: baseline / 2 }}>Time limit</Text>
      <Input style={{ marginBottom: baseline }} value={timeLimit} onChange={setTimeLimit} />
      <Button title="Start" onPress={onPressStart} />
    </View>
  )
}

export default HomeScreen