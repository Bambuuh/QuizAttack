import { RouteProp, useNavigation } from '@react-navigation/core'
import React, { useEffect, useRef, useState } from 'react'
import Question from '../../components/Question'
import Timer from '../../components/Timer'
import { ScreenRoute } from '../../navigation/constants'
import { getQuizQuestions } from '../../api/quizService'
import * as S from './styled'
import { QuizQuestion } from '../../api/types'
import { Player } from '../../types'
import { Alert, useWindowDimensions, Animated } from 'react-native'
import { ScreenParams } from '../../navigation/mainNavigation'

type Props = {
  route: RouteProp<ScreenParams, ScreenRoute.QUIZ>
}

const QuizScreen: React.FC<Props> = ({ route }) => {
  const timeLimit = route.params.timeLimit
  const dimensions = useWindowDimensions()

  const moveWidth = dimensions.width

  const navigation = useNavigation()
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [isPlayerOne, setIsPlayerOne] = useState(true)
  const [playerOne, setPlayerOne] = useState<Player>({ bank: timeLimit, current: timeLimit })
  const [playerTwo, setPlayerTwo] = useState<Player>({ bank: timeLimit, current: timeLimit })
  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const playerOneQuestionAnimation = useRef(new Animated.Value(0)).current
  const playerTwoQuestionAnimation = useRef(new Animated.Value(moveWidth)).current
  const [showCorrect, setShowCorrect] = useState(false)

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

  const togglePlayerOne = Animated.timing(playerOneQuestionAnimation, {
    toValue: isPlayerOne ? -moveWidth : 0,
    duration: 300,
    useNativeDriver: true
  })

  const togglePlayerTwo = Animated.timing(playerTwoQuestionAnimation, {
    toValue: !isPlayerOne ? moveWidth : 0,
    duration: 300,
    useNativeDriver: true
  })

  const toggleAnimation = () => {
    const first = isPlayerOne ? togglePlayerOne : togglePlayerTwo
    const second = !isPlayerOne ? togglePlayerOne : togglePlayerTwo
    return first.start(() => {
      setShowCorrect(false)
      nextQuestion()
      second.start()
    })
  }

  const nextQuestionAnimation = (midAnimationCb: Function) => {
    const animation = isPlayerOne ? playerOneQuestionAnimation : playerTwoQuestionAnimation
    return Animated.timing(animation, {
      toValue: isPlayerOne ? -moveWidth : moveWidth,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      if (midAnimationCb) {
        midAnimationCb()
      }
      nextQuestion()
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    })
  }

  const wrongAnswerAnimation = (cb: Function) => {
    setShowCorrect(true)
    Animated.delay(1000).start(() => {
      if (cb) cb()
    })
  }

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1)
  }

  const onRightAnswer = () => {
    setShowCorrect(true)
    setIsPlayerOne(!isPlayerOne)
    toggleAnimation()
  }

  const onWrongAnswer = () => {
    wrongAnswerAnimation(() => nextQuestionAnimation(() => {
      setShowCorrect(false)
    }))
  }

  const onTimerOneEnd = () => {
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
      <Timer onTimerEnd={onTimerOneEnd} player={playerOne} active={!isPlayerOne} rotated />
      <S.MidContainer>
        <Question
          showCorrect={showCorrect}
          onRightAnswer={onRightAnswer}
          onWrongAnser={onWrongAnswer}
          style={{ padding: 16, opacity: 0, transform: [{ translateX: -400 }] }}
          question={current}
        />
        <Animated.View style={{ position: 'absolute', transform: [{ translateX: playerOneQuestionAnimation }] }}>
          <Question
            showCorrect={showCorrect}
            onRightAnswer={onRightAnswer}
            onWrongAnser={onWrongAnswer}
            style={{ padding: 16 }}
            question={current}
          />
        </Animated.View>
        <Animated.View style={{ position: 'absolute', right: 0, transform: [{ translateX: playerTwoQuestionAnimation, }], }}>
          <Question
            showCorrect={showCorrect}
            onRightAnswer={onRightAnswer}
            onWrongAnser={onWrongAnswer}
            style={{ padding: 16 }}
            rotated
            question={current}
          />
        </Animated.View>
      </S.MidContainer>
      <Timer onTimerEnd={onTimerTwoEnd} player={playerTwo} active={isPlayerOne} />
    </S.Container>
  )
}

export default QuizScreen