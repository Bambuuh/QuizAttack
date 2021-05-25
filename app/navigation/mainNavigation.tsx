import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { colors } from '../theme'
import { StackRoute } from './constants'
import MainStack from './home'

const { Navigator, Screen } = createStackNavigator()

const MainNavigation: React.FC = () => {
  return (
    <NavigationContainer theme={{
      dark: true,
      colors: {
        notification: colors.primary.color,
        border: colors.primary.color,
        background: colors.background.color,
        card: colors.primary.color,
        primary: colors.primary.color,
        text: colors.background.onColor
      }
    }}>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name={StackRoute.MAIN} component={MainStack} />
      </Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation