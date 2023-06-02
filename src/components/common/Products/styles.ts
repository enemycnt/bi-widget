import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: ${(props) => (props.primary ? "palevioletred" : "green")};
  color: white;
  font-size: 1em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: none;
  border-radius: 3px;
  outline: none;
`;

export const ProductsWrap = styled.div`
  width: 100%;
  font-size: 14px;
  color: #75808e;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  padding: 0;
  z-index: 1;
`;

export const BottomPanel = styled.div`
  bottom: 0;
  position: sticky;
  background: #fff;
  display: flex;
  justify-content: center;
`;

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
`;

export const ErrorData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  flex-grow: 1;
`;
