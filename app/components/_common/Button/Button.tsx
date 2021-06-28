import React from 'react'
import { LinearGradientProps } from 'react-native-linear-gradient'
import * as S from './styled'

type OwnProps = {
  title: string
  onPress: () => void
  containerPadding?: number
  colors?: string[]
}

type Props = OwnProps & Omit<LinearGradientProps, 'colors'>

const Button: React.FC<Props> = ({ title, colors, onPress, ...props }) => {

  const buttonColors = colors || ['#4d4e64', '#38374a']

  return (
    <S.Container colors={buttonColors} {...props} >
      <S.Pressable onPress={onPress}>
        <S.ButtonText>{title}</S.ButtonText>
      </S.Pressable>
    </S.Container>
  )
}

export default Button