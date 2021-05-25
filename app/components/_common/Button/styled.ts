import styled from 'styled-components/native'
import {baseline, colors} from '../../../theme'

const borderRadius = 4
export const Container = styled.TouchableOpacity<{containerPadding?: number}>`
  border-top-right-radius: ${borderRadius}px;
  border-bottom-right-radius: ${borderRadius}px;
  background-color: ${colors.primary.color};
  padding: ${baseline}px;
  align-items: center;
  justify-content: center;
  ${({containerPadding}) =>
    containerPadding && `margin-left: -${containerPadding}px`}
`

export const ButtonText = styled.Text`
  font-size: 20px;
  color: white;
`
