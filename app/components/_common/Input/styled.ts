import styled from 'styled-components/native'
import {baseline} from '../../../theme'

const borderRadius = 4

export const Container = styled.View<{containerPadding?: number}>`
  padding: ${baseline}px;
  background-color: white;
  border-top-left-radius: ${borderRadius};
  border-bottom-left-radius: ${borderRadius};
  ${({containerPadding}) =>
    containerPadding && `margin-right: -${containerPadding}px`}
`
