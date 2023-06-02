import { useStore } from "@nanostores/react";
import React, { useState } from "react";

import { $products, selectedCategory } from "../../../store/products";

import {
  CategoryDropdown,
  DropdownTitle,
  DropdownList,
  DropdownItem,
} from "./styles";

interface DropDownCategoryProps {
  children: React.ReactNode;
  active: boolean;
  dropdownItems: string[];
  marketCategory: string;
}

const DropDownCategory = ({
  children,
  active,
  dropdownItems,
  marketCategory,
}: DropDownCategoryProps) => {
  const products = useStore($products);
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  return (
    <CategoryDropdown
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
      active={active}
    >
      <div
        onClick={() => {
          {
            selectedCategory({
              category: "",
              parentMarket: marketCategory,
            });
          }
        }}
      >
        <DropdownTitle>{children}</DropdownTitle>
      </div>
      {show && (
        <DropdownList>
          {dropdownItems.map((category) => (
            <DropdownItem
              key={category}
              active={products.selectedCategory === category}
              onClick={() => {
                selectedCategory({
                  category,
                  parentMarket: marketCategory,
                });
              }}
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
