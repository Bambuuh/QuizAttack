import styled from 'styled-components/native'

export const Container = styled.View<{rotated?: boolean}>`
  width: 100%;
  height: 25%;
  background-color: red;
  align-items: center;
  justify-content: center;
  ${({rotated}) => rotated && `transform: rotate(180deg)`}
`

export const TimeText = styled.Text`
  font-size: 50px;
`
