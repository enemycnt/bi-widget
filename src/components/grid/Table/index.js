import React from 'react';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import {TableWrap, TableHeader} from "./styles"

import TableRow from "../TableRow"


const Table = ({products, showedArray}) => {
  const Row = ({ index, style }) => {
    return (
      <div style={style}>
        <TableRow
          key={products[showedArray][index].s}
          item={products[showedArray][index]}
        />
      </div>
    );};
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
        {({ height, width }) => (
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
};

export default React.memo(Table);