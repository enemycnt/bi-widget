import styled from "@emotion/styled";

interface CategoryProps {
  active: boolean;
}
export const CategoriesWrap = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  color: #75808e;
  font-size: 14px;
  position: relative;
  overflow-x: auto;
  width: inherit;
  &::-webkit-scrollbar {
    width: 2px;
  }
`;

export const Category = styled.div<CategoryProps>`
  display: flex;
  align-items: center;
  padding: 5px;
  background: ${(props) => (props.active ? "#f2f2f2" : "white")};
  border-radius: 3px;
  color: ${(props) => (props.active ? "#464d57" : "#75808e")};
  cursor: pointer;
`;

export const TriangleDown = styled.div`
  margin-left: 2px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #75808e;
`;
