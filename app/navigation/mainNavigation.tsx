import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StackRoute } from './constants'
import MainStack from './home'

const { Navigator, Screen } = createStackNavigator()

const MainNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name={StackRoute.MAIN} component={MainStack} />
      </Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation