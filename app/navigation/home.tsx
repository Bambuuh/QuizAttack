import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ScreenRoute } from './constants'
import HomeScreen from '../screens/HomeScreen'

const { Navigator, Screen } = createStackNavigator()

const MainStack: React.FC = () => {
  return (
    <Navigator>
      <Screen name={ScreenRoute.HOME} component={HomeScreen} />
    </Navigator>
  )
}

export default MainStack