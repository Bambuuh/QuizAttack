import React from 'react'
import { TextInput, View, ViewProps } from 'react-native'
import * as S from './styled'

type OwnProps = {
  value: string
  onChange: (value: string) => void
}

type Props = OwnProps & ViewProps

const Input: React.FC<Props> = ({ value, onChange, ...props }) => {
  return (
    <S.Container {...props}>
      <TextInput value={value} onChangeText={onChange} />
    </S.Container>
  )
}

export default Input