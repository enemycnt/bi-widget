import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { TableWrap, TableHeader } from "./styles";

import TableRow from "../TableRow";

interface TableProps {
  products: any;
  showedArray: string;
}

interface RowProps {
  index: number;
  style: React.CSSProperties | undefined;
}

const Table = React.memo(({ products, showedArray }: TableProps) => {
  const Row = ({ index, style }: RowProps) => {
    return (
      <div style={style}>
        <TableRow
          key={products[showedArray][index].s}
          item={products[showedArray][index]}
        />
      </div>
    );
  };
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
