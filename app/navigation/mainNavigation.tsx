import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import QuizScreen from '../screens/QuizScreen'
import { colors } from '../theme'
import { ScreenRoute } from './constants'

const { Navigator, Screen } = createStackNavigator()

export type ScreenParams = {
  [ScreenRoute.QUIZ]: {
    timeLimit: number
  }
}

const MainNavigation: React.FC = () => {
  return (
    <NavigationContainer theme={{
      dark: true,
      colors: {
        notification: colors.primary.color,
        border: colors.primary.color,
        background: '#2f2e3f',
        card: colors.primary.color,
        primary: colors.primary.color,
        text: colors.background.onColor
      }
    }}>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen options={{ headerShown: false }} name={ScreenRoute.HOME} component={HomeScreen} />
        <Screen options={{ headerShown: false }} name={ScreenRoute.QUIZ} component={QuizScreen} />
      </Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation