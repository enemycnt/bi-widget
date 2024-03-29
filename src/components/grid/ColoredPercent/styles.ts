import styled from "@emotion/styled";

export const ColoredWrap = styled.div`
  padding: 5px 0;
  text-align: right;
  color: ${(props: { sign: string }) => (props.sign === "+" ? "green" : "red")};
`;
