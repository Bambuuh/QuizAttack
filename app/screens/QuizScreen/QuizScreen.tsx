import { RouteProp } from '@react-navigation/core'
import React, { useState } from 'react'
import Question from '../../components/Question'
import Timer from '../../components/Timer'
import { ScreenRoute } from '../../navigation/constants'
import { HomeStackParams } from '../../navigation/home'
import * as S from './styled'

type Props = {
  route: RouteProp<HomeStackParams, ScreenRoute.QUIZ>
}

const QuizScreen: React.FC<Props> = ({ route }) => {
  const [questions, setQuestions] = useState(route.params.questions)
  const [questionIndex, setQuestionIndex] = useState(0)

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1)
  }

  const current = questions[questionIndex]

  return (
    <S.Container>
      <Timer rotated />
      <Question
        onRightAnswer={nextQuestion}
        onWrongAnser={nextQuestion}
        style={{ padding: 16 }}
        rotated={false}
        question={current}
      />
      <Timer />
    </S.Container>
  )
}

export default QuizScreen