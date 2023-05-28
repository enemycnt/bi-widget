import React, { useState } from "react";

import { useStoreon } from "storeon/react"; // or storeon/preact

import {
  CategoryDropdown,
  DropdownTitle,
  DropdownList,
  DropdownItem,
} from "./styles";


const DropDownCategory = ({ children, active, dropdownItems, marketCategory }) => {
  const { dispatch, products } = useStoreon("products");
  const [show, setShow] = useState(false);
  const showDropdown = (_e: React.BaseSyntheticEvent) => {
    console.log("🚀 ~ file: index.tsx:17 ~ showDropdown ~ _e:", _e)
    setShow(!show);
  };
  const hideDropdown = (_e: React.BaseSyntheticEvent) => {
    console.log("🚀 ~ file: index.tsx:20 ~ hideDropdown ~ _e:", _e)
    setShow(false);
  };

  return (
    <CategoryDropdown
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
      active={active}
    >
      <div
        onClick={() =>
          dispatch("products/selectedCategory", {
            category: "",
            parentMarket: marketCategory,
          })
        }
      >
        <DropdownTitle>{children}</DropdownTitle>
      </div>
      {show && (
        <DropdownList>
          {dropdownItems.map((category) => (
            <DropdownItem
              key={category}
              active={products.selectedCategory === category}
              onClick={() =>
                dispatch("products/selectedCategory", {
                  category,
                  parentMarket: marketCategory,
                })
              }
            >
              {category}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </CategoryDropdown>
  );
};

export default DropDownCategory;