
import styled from 'styled-components';


export const Button = styled.button<{textColor: string}>`
  color: ${props => (props.textColor)};
  width:200px;
  padding: 10px;
  margin: 0 1em;
  background:#06a94d;

  &:hover {
    transition: 0.8s ease;
    border: 1px solid #06a94d;
    color: black;
    background: transparent;
  }
`


