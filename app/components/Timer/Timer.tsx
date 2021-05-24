import React from 'react'
import { ViewProps } from 'react-native'
import * as S from './styled'

type OwnProps = {
  rotated?: boolean
}

type Props = OwnProps & ViewProps

const Timer: React.FC<Props> = ({ rotated, ...props }) => {


  return (
    <S.Container rotated={rotated} {...props}>
      <S.TimeText>15:02</S.TimeText>
    </S.Container>
  )
}

export default Timer