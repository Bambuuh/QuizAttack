import { RouteProp } from '@react-navigation/core'
import React from 'react'
import { Text } from 'react-native'
import Button from '../../components/_common/Button'
import { ScreenRoute } from '../../navigation/constants'
import { HomeStackParams } from '../../navigation/home'
import * as S from './styled'

type Props = {
  route: RouteProp<HomeStackParams, ScreenRoute.QUIZ>
}

const QuizScreen: React.FC<Props> = ({ route }) => {
  const { questions } = route.params

  const first = questions[0]
  const options = [...first.incorrect_answers, first.correct_answer]
  return (
    <S.Container>
      <Text>{first.question}</Text>
      {options.map(o => (<Button key={o} title={o} onPress={() => null} />))}
    </S.Container>
  )
}

export default QuizScreen