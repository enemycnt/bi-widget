import React, { useEffect } from "react";
import { useStoreon } from "storeon/react"; // or storeon/preact

import {
  Button,
  ProductsWrap,
  Header,
  BottomPanel,
  NoData,
  ErrorData,
} from "./styles";

import Categories from "../../filters/Categories"
import FilterBar from "../../filters/FilterBar"
import Table from "../../grid/Table"
import Loader from "../Loader"

const Products = ({ store }) => {
  const { dispatch, products } = useStoreon("products");
  useEffect(() => {
    dispatch("products/load");
    // eslint-disable-next-line
  }, []);

  let showedArray = products.selectedParentMarket === 'starred' ? 'starredData' : 'filteredData'; 
  showedArray = products.searchQuery.length > 0 ? 'searchedData' : showedArray; 

  return (
    <>
      {products.loading && <Loader />}
      {products.error ? (
              <ErrorData>
                {products.error.message}
              </ErrorData>
            ) : null}
      {products.loaded && (
        <>
          <Header>
            <Categories products={products} />
            <FilterBar />
          </Header>
          <ProductsWrap>
            {products[showedArray].length > 0 ? (
              <Table products={products} showedArray={showedArray} />
            ) : (
              <NoData>
                <span>NO DATA</span>
              </NoData>
            )}
          </ProductsWrap>
          {products.socketEstablished && (
            <BottomPanel>
              {products.socketOpen ? (
                <Button
                  primary
                  onClick={() => dispatch("products/ws/disconnect")}
                >
                  Disconnect WebSocket
                </Button>
              ) : (
                <Button onClick={() => dispatch("products/ws/connect")}>
                  Reconnect WebSocket
                </Button>
              )}
            </BottomPanel>
          )}
        </>
      )}
    </>
  );
};

export default Products;
