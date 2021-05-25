import styled from 'styled-components/native'

export const Container = styled.View<{active: boolean; rotated?: boolean}>`
  position: relative;
  width: 100%;
  height: 15%;
  background-color: #2980b9;
  align-items: center;
  justify-content: center;
  ${({active}) => active && `backgroundColor: #f1c40f`}
  ${({rotated}) => rotated && `transform: rotate(180deg)`}
`

export const TimeText = styled.Text`
  font-size: 50px;
`
