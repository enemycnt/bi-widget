import styled from "@emotion/styled";

interface TableHeaderProps {
  right?: boolean;
}

export const TableWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 40% 1fr 1fr;
  font-size: 12px;
`;

export const TableHeader = styled.div<TableHeaderProps>`
  position: sticky;
  top: 75px;
  text-align: ${(props) => (props.right ? "right" : "left")};
  font-weight: bold;
  padding: 5px 0;
  background: #fff;
`;
