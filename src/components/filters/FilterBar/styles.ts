import styled from "@emotion/styled";

export const CustomLabel = styled.label`
  font-size: 14px;
  color: #75808e;
  cursor: pointer;
`;
export const CustomSearchbar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
export const FormWrap = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const SearchInput = styled.input`
  padding: 5px 10px;
  border: none;
  outline: none;
  border-bottom: 1px solid #eaecef;
  position: relative;
  width: 100%;
`;

export const CustomRadio = styled.input`
  appearance: none;
  width: 12px;
  height: 12px;
  border: 1px solid darkgray;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    width: 60%;
    height: 60%;
    margin: 20% auto;
    border-radius: 50%;
  }
  &:checked:before {
    background: orange;
  }
`;

export const FilterBarWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
