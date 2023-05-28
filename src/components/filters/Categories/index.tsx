import { useStoreon } from "storeon/react";

import { CategoriesWrap, Category, TriangleDown } from "./styles";

import DropDownCategory from "../DropDownCategory";

const Categories = () => {
  const { dispatch, products } = useStoreon("products");

  const menuLabels = Object.keys(products.parentCategories);
  const firstMenus = menuLabels
    .filter((key) => products.parentCategories[key].length === 1)
    .sort((a, b) => a.localeCompare(b));

  const secondMenus = menuLabels.filter(
    (key) => products.parentCategories[key].length > 1
  );

  return (
    <CategoriesWrap>
      <Category
        data-testid="starred-category"
        active={products.selectedParentMarket === "starred"}
        onClick={() => dispatch("products/toggleStarred")}
      >
        ★
      </Category>
      {firstMenus.map((category) => (
        <Category
          data-testid="simple-category"
          onClick={() =>
            dispatch("products/selectedCategory", {
              category,
              parentMarket: category,
            })
          }
          active={products.selectedParentMarket === category}
          key={category}
        >
          {category}
        </Category>
      ))}
      {secondMenus.map((market) => (
        <DropDownCategory
          active={products.selectedParentMarket === market}
          key={market}
          dropdownItems={products.parentCategories[market]}
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
