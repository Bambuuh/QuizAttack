import styled from 'styled-components/native'
import {baseline} from '../../../theme'

export const Container = styled.TouchableOpacity`
  border-radius: 4px;
  background-color: blue;
  padding: ${baseline}px;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  font-size: 24px;
  color: white;
`
