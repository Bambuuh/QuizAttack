import React from 'react'
import { ViewProps } from 'react-native'
import * as S from './styled'

type OwnProps = {
  active: boolean
  rotated?: boolean
}

type Props = OwnProps & ViewProps

const Timer: React.FC<Props> = ({ active, rotated, ...props }) => {


  return (
    <S.Container active={active} rotated={rotated} {...props}>
      <S.TimeText>15:02</S.TimeText>
    </S.Container>
  )
}

export default Timer