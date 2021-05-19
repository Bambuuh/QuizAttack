import axios from 'axios'
import {QuizQuestion, QuizResponse} from './types'

export async function getQuizQuestions() {
  const {data} = await axios.get<QuizResponse>(
    'https://opentdb.com/api.php?amount=50&type=multiple&encode=url3986',
  )

  return data.results.map(parseResult)
}

function parseResult(result: QuizQuestion) {
  const mapped: QuizQuestion = {}
  Object.keys(result).forEach(key => {
    if (typeof result[key] === 'string') {
      mapped[key] = decodeURIComponent(result[key])
    }
    if (Array.isArray(result[key])) {
      const sub = result[key].map((r: string) => decodeURIComponent(r))
      mapped[key] = sub
    }
  })
  return mapped
}
