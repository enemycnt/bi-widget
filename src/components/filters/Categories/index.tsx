import { useStore } from "@nanostores/react";
import { ParentCategories } from "storeTypes";

import {
  $products,
  selectedCategory,
  toggleStarred,
} from "../../../store/products";
import DropDownCategory from "../DropDownCategory";

import { CategoriesWrap, Category, TriangleDown } from "./styles";

const Categories = () => {
  const products = useStore($products);
  if (products.parentCategories.length === 0) return null;
  const parentCategories = products.parentCategories as ParentCategories;
  const { selectedParentMarket } = products;
  const menuLabels = Object.keys(parentCategories);
  const firstMenus = menuLabels
    .filter((key) => parentCategories[key].length === 1)
    .sort((a, b) => a.localeCompare(b));

  const secondMenus = menuLabels.filter(
    (key) => parentCategories[key].length > 1
  );

  return (
    <CategoriesWrap>
      <Category
        data-testid="starred-category"
        active={selectedParentMarket === "starred"}
        onClick={() => {
          toggleStarred();
        }}
      >
        ★
      </Category>
      {firstMenus.map((category) => (
        <Category
          data-testid="simple-category"
          onClick={() => {
            selectedCategory({
              category,
              parentMarket: category,
            });
          }}
          active={selectedParentMarket === category}
          key={category}
        >
          {category}
        </Category>
      ))}
      {secondMenus.map((market) => (
        <DropDownCategory
          active={selectedParentMarket === market}
          key={market}
          dropdownItems={parentCategories[market]}
          marketCategory={market}
        >
          {market}
          <TriangleDown />
        </DropDownCategory>
      ))}
    </CategoriesWrap>
  );
};

export default Categories;
