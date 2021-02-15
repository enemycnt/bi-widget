
import styled from "styled-components";

export const ColoredWrap = styled.div`
  padding: 5px 0;
  text-align: right;
  color: ${(props) => (props.sign === '+' ? 'green' : 'red')}
`