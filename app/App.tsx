import React from 'react'
import { View } from 'react-native'
import MainNavigation from './navigation/mainNavigation'

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <MainNavigation />
    </View>
  )
}

export default App
