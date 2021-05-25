import styled from 'styled-components/native'
import {colors} from '../../theme'

export const Container = styled.View<{rotated?: boolean}>`
  ${({rotated}) => rotated && `transform: rotate(180deg)`}
`

export const QueryText = styled.Text`
  color: ${colors.background.onColor};
  font-weight: bold;
  text-align: center;
  font-size: 24px;
  margin-bottom: 16px;
`
