import React, { useEffect, useState } from 'react'
import { ViewProps } from 'react-native'
import { QuizQuestion } from '../../api/types'
import Button from '../_common/Button'
import * as S from './styled'

type OwnProps = {
  question: QuizQuestion
  rotated?: boolean
  onRightAnswer: () => void
  onWrongAnser: () => void
  showCorrect: boolean
}

type Props = OwnProps & ViewProps

type QuizOption = {
  title: string,
  correct: boolean
}

function shuffle(array: QuizOption[]) {
  var currentIndex = array.length, temporaryValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const Question: React.FC<Props> = ({ question, showCorrect, onRightAnswer, onWrongAnser, rotated, ...props }) => {
  const query = question.question

  const incorrect: QuizOption[] = question.incorrect_answers.map(a => ({ title: a, correct: false }))
  const correct: QuizOption = { title: question.correct_answer, correct: true }
  const unshuffled: QuizOption[] = [...incorrect, correct]
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const [options, setOptions] = useState<QuizOption[]>([])

  // @ts-ignore
  const containerPadding = props?.style?.padding || 0

  useEffect(() => {
    const unshuffled: QuizOption[] = [...incorrect, correct]
    const options = shuffle(unshuffled)
    setOptions(options)
  }, [question])

  const onPressOption = (option: QuizOption, index: number) => {
    setSelectedIndex(index)
    if (option.correct) {
      return onRightAnswer()
    }

    return onWrongAnser()
  }

  const renderOptions = () => {
    return options.map((o, index) => {
      const onPress = () => onPressOption(o, index)
      const style: any = index === 0 ? {} : { marginTop: 16 }
      if (o.correct) {
        if (showCorrect) {
          style.backgroundColor = 'green'
        } else {
          style.backgroundColor = 'purple'
        }
      }
      if (showCorrect && selectedIndex === index && !o.correct) {
        style.backgroundColor = 'red'
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