import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Button from '../../components/_common/Button'
import Input from '../../components/_common/Input'
import { baseline } from '../../theme'
import { useNavigation } from '@react-navigation/core'
import { getQuizQuestions } from '../../api/quizService'
import { HomeStackParams } from '../../navigation/home'
import { ScreenRoute } from '../../navigation/constants'

const HomeScreen: React.FC = () => {

  const navigation = useNavigation()
  const [questionsAmount, setQuestionsAmount] = useState('0')

  const onPressStart = async () => {
    const params: HomeStackParams[ScreenRoute.QUIZ] = {
    }
    navigation.navigate(ScreenRoute.QUIZ, params)
  }

  return (
    <View style={{ padding: baseline }}>
      <Text style={{ marginBottom: baseline * 2 }}>HOME SCREEN</Text>
      <Text style={{ marginBottom: baseline / 2 }}>Number of questions</Text>
      <Input style={{ marginBottom: baseline }} value={questionsAmount} onChange={setQuestionsAmount} />
      <Button title="Start" onPress={onPressStart} />
    </View>
  )
}

export default HomeScreen