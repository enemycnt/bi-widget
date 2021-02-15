import styled from "styled-components";

export const CategoryDropdown = styled.div`
  background: ${(props) => (props.active ? "#f2f2f2" : "white")};
  border-radius: 3px;
  color: ${(props) => (props.active ? "#464d57" : "#75808e")};
  cursor: pointer;
  position: relative;
  z-index: 111;
`;
export const DropdownTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
  width: 100%;
  position: absolute;
  box-shadow: 0 0 2px #ccc;
  border-radius: 3px;
  z-index: 9999;
`;
export const DropdownItem = styled.div`
  padding: 5px;
  color: ${(props) => (props.active ? "#464d57" : "#75808e")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  background: #fff;
  &:hover {
    background: #ccc;
  }
`;