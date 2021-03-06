import styled from 'styled-components/native'
import {baseline} from '../../../theme'

const borderRadius = 4

export const Container = styled.View<{containerPadding?: number}>`
  padding: ${baseline}px;
  background-color: #21202f;
  /* border-top-left-radius: ${borderRadius}px;
  border-bottom-left-radius: ${borderRadius}px; */
  border-radius: 10px;
  /* ${({containerPadding}) =>
    containerPadding && `margin-right: -${containerPadding}px`} */
`
