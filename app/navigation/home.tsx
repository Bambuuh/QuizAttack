import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ScreenRoute } from './constants'
import HomeScreen from '../screens/HomeScreen'
import QuizScreen from '../screens/QuizScreen'

export type HomeStackParams = {
  [ScreenRoute.QUIZ]: {
  }
}

const { Navigator, Screen } = createStackNavigator()

const MainStack: React.FC = () => {
  return (
    <Navigator>
      <Screen name={ScreenRoute.HOME} component={HomeScreen} />
      <Screen options={{ headerShown: false }} name={ScreenRoute.QUIZ} component={QuizScreen} />
    </Navigator>
  )
}

export default MainStack