import { ItemType } from "ItemType";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { Product, ShowedArray } from "storeTypes";

import TableRow from "../TableRow";

import { TableWrap, TableHeader } from "./styles";

interface TableProps {
  products: Product;
  showedArray: ShowedArray;
}

interface RowProps {
  data: Array<ItemType>;
  index: number;
  style: React.CSSProperties | undefined;
}

const Row = ({ data, index, style }: RowProps) => {
  const product = data[index];
  return (
    <div style={style}>
      <TableRow key={product.s} item={product} />
    </div>
  );
};

const Table = React.memo(({ products, showedArray }: TableProps) => {

  return (
    <>
      <TableWrap>
        <TableHeader>Pair</TableHeader>
        <TableHeader>Last Price</TableHeader>
        {products.changeOrVolume === "change" ? (
          <TableHeader right>Change</TableHeader>
        ) : (
          <TableHeader right>Volume</TableHeader>
        )}
      </TableWrap>
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <List
            height={height}
            itemCount={products[showedArray].length}
            itemSize={25}
            itemData={products[showedArray]}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </>
  );
});

export default Table;
