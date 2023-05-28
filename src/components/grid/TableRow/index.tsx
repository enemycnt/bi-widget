import React from "react";
import { useStoreon } from "storeon/react";
import { ItemType } from "ItemType";
import {
  TableCell,
  TableCellChangeVolume,
  StarWrap,
  TableRowFlex,
} from "./styles";

import ColoredPercent from "../ColoredPercent";

const TableRow = React.memo(({ item }: { item: ItemType }) => {
  const { dispatch, products } = useStoreon("products");

  return (
    <TableRowFlex>
      <TableCell title={item.s}>
        <StarWrap
          active={products.starredData.includes(item)}
          onClick={() => dispatch("products/addToStarred", item)}
        >
          ★
        </StarWrap>
        <span data-testid="product-name">
          {item.b}/{item.q}
        </span>
      </TableCell>
      <TableCell>
        {item.c.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 9,
        })}
      </TableCell>

      {products.changeOrVolume === "change" ? (
        <ColoredPercent item={item} />
      ) : (
        <TableCellChangeVolume>
          {item.qv.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </TableCellChangeVolume>
      )}
    </TableRowFlex>
  );
});

export default TableRow;
