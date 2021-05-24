import styled from 'styled-components/native'

export const Container = styled.View<{rotated: boolean}>`
  ${({rotated}) => rotated && `transform: rotate(180deg)`}
`

export const QueryText = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 24px;
`
