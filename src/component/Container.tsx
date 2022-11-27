import styled from "styled-components";



export const Container = styled.div<{marginTop: string}>`
  margin-top: ${props => (props.marginTop)};
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
