import { RouteProp } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import Question from '../../components/Question'
import Timer from '../../components/Timer'
import { ScreenRoute } from '../../navigation/constants'
import { HomeStackParams } from '../../navigation/home'
import { getQuizQuestions } from '../../api/quizService'
import * as S from './styled'
import { QuizQuestion } from '../../api/types'

type Props = {
  route: RouteProp<HomeStackParams, ScreenRoute.QUIZ>
}

const QuizScreen: React.FC<Props> = ({ route }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [playerOne, setPlayerOne] = useState(true)
  const [loadingQuestions, setLoadingQuestions] = useState(false)

  useEffect(() => {
    const lessThan25 = questions.length - questionIndex < 25
    if (!loadingQuestions && lessThan25) {
      getMoreQuestions()
    }
  }, [questionIndex])

  const getMoreQuestions = async () => {
    setLoadingQuestions(true)
    const newQuestions = await getQuizQuestions()
    setLoadingQuestions(false)
    setQuestions([...questions, ...newQuestions])
  }

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1)
  }

  const onRightAnswer = () => {
    nextQuestion()
    setPlayerOne(!playerOne)
  }

  const onWrongAnswer = () => {
    nextQuestion()
  }

  const current = questions[questionIndex]

  if (questions.length === 0) {
    return null
  }

  return (
    <S.Container>
      <Timer active={!playerOne} rotated />
      <Question
        onRightAnswer={onRightAnswer}
        onWrongAnser={onWrongAnswer}
        style={{ padding: 16 }}
        rotated={!playerOne}
        question={current}
      />
      <Timer active={playerOne} />
    </S.Container>
  )
}

export default QuizScreen