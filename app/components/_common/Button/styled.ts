import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'
import {baseline, colors} from '../../../theme'

const borderRadius = 4
export const Container = styled(LinearGradient)<{containerPadding?: number}>`
  border-radius: 10px;
`

export const Pressable = styled.TouchableOpacity`
  padding: ${baseline}px;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  font-size: 20px;
  color: white;
`
