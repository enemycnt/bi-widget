import { useStore } from "@nanostores/react";
import { ItemType } from "ItemType";
import React from "react";

import { $products, addToStarred } from "../../../store/products";
import ColoredPercent from "../ColoredPercent";

import {
  TableCell,
  TableCellChangeVolume,
  StarWrap,
  TableRowFlex,
} from "./styles";

const TableRow = React.memo(({ item }: { item: ItemType }) => {
  const products = useStore($products);

  return (
    <TableRowFlex>
      <TableCell title={item.s}>
        <StarWrap
          active={products.starredData.includes(item)}
          onClick={() => {
            addToStarred(item);
          }}
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
