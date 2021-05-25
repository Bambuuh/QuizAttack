import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, ViewProps } from 'react-native'
import * as S from './styled'

type OwnProps = {
  title: string
  onPress: () => void
  containerPadding?: number
}

type Props = OwnProps & TouchableOpacityProps

const Button: React.FC<Props> = ({ title, onPress, ...props }) => {
  return (
    <S.Container {...props} onPress={onPress}>
      <S.ButtonText>{title}</S.ButtonText>
    </S.Container>
  )
}

export default Button