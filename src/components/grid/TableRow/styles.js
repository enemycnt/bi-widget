import styled from "styled-components";

export const TableCell = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
`;

export const TableCellChangeVolume = styled.div`
  padding: 5px 0;
  text-align: right;
`;

export const StarWrap = styled.div`
  color: ${(props) => (props.active ? "orange" : "inherit")};
  margin-right: 5px;
  cursor: pointer;
`;
export const TableRowFlex = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 40% 1fr 1fr;
  font-size: 12px;
`;
