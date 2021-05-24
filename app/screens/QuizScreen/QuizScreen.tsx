import { RouteProp, useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import Question from '../../components/Question'
import Timer from '../../components/Timer'
import { ScreenRoute } from '../../navigation/constants'
import { HomeStackParams } from '../../navigation/home'
import { getQuizQuestions } from '../../api/quizService'
import * as S from './styled'
import { QuizQuestion } from '../../api/types'
import { Player } from '../../types'
import { Alert } from 'react-native'

type Props = {
  route: RouteProp<HomeStackParams, ScreenRoute.QUIZ>
}

const QuizScreen: React.FC<Props> = ({ route }) => {
  const timeLimit = route.params.timeLimit

  const navigation = useNavigation()
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [isPlayerOne, setIsPlayerOne] = useState(true)
  const [playerOne, setPlayerOne] = useState<Player>({ bank: timeLimit, current: timeLimit })
  const [playerTwo, setPlayerTwo] = useState<Player>({ bank: timeLimit, current: timeLimit })
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
    setIsPlayerOne(!isPlayerOne)
  }

  const onWrongAnswer = () => {
    nextQuestion()
  }

  const onTimeOneEnd = () => {
    Alert.alert('Player TWO wins!!!')
    navigation.goBack()
  }

  const onTimerTwoEnd = () => {
    Alert.alert('Player ONE wins!!!')
    navigation.goBack()
  }

  const current = questions[questionIndex]

  if (questions.length === 0) {
    return null
  }

  return (
    <S.Container>
      <Timer onTimerEnd={onTimerTwoEnd} player={playerOne} active={!isPlayerOne} rotated />
      <Question
        onRightAnswer={onRightAnswer}
        onWrongAnser={onWrongAnswer}
        style={{ padding: 16 }}
        rotated={!isPlayerOne}
        question={current}
      />
      <Timer onTimerEnd={onTimerTwoEnd} player={playerTwo} active={isPlayerOne} />
    </S.Container>
  )
}

export default QuizScreen