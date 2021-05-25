import React from 'react'
import { ViewProps } from 'react-native'
import { QuizQuestion } from '../../api/types'
import Button from '../_common/Button'
import * as S from './styled'

type OwnProps = {
  question: QuizQuestion
  rotated?: boolean
  onRightAnswer: () => void
  onWrongAnser: () => void
}

type Props = OwnProps & ViewProps

type QuizOption = {
  title: string,
  correct: boolean
}

function shuffle(array: QuizOption[]) {
  var currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const Question: React.FC<Props> = ({ question, onRightAnswer, onWrongAnser, rotated, ...props }) => {
  const query = question.question

  const incorrect: QuizOption[] = question.incorrect_answers.map(a => ({ title: a, correct: false }))
  const correct: QuizOption = { title: question.correct_answer, correct: true }
  const unshuffled: QuizOption[] = [...incorrect, correct]
  const options = shuffle(unshuffled)

  // @ts-ignore
  const containerPadding = props?.style?.padding || 0

  const onPressOption = (option: QuizOption) => {
    if (option.correct) {
      return onRightAnswer()
    }

    return onWrongAnser()
  }

  const renderOptions = () => {
    return options.map((o, index) => {
      const onPress = () => onPressOption(o)
      const style: any = index === 0 ? {} : { marginTop: 16 }
      if (o.correct) {
        style.backgroundColor = 'green'
      }
      return (<Button containerPadding={containerPadding} style={style} key={o.title} title={o.title} onPress={onPress} />)
    })
  }

  return (
    <S.Container rotated={rotated} {...props}>
      <S.QueryText>{query}</S.QueryText>
      {renderOptions()}
    </S.Container>
  )
}

export default Question