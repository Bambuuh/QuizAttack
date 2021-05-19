import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ScreenRoute } from './constants'
import HomeScreen from '../screens/HomeScreen'
import QuizScreen from '../screens/QuizScreen'
import { QuizQuestion } from '../api/types'

export type HomeStackParams = {
  [ScreenRoute.QUIZ]: {
    questions: QuizQuestion[]
  }
}

const { Navigator, Screen } = createStackNavigator()

const MainStack: React.FC = () => {
  return (
    <Navigator>
      <Screen name={ScreenRoute.HOME} component={HomeScreen} />
      <Screen name={ScreenRoute.QUIZ} component={QuizScreen} />
    </Navigator>
  )
}

export default MainStack