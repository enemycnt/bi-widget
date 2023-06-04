import { useStore } from "@nanostores/react";
import { useEffect, useRef } from "react";
import { ShowedArray } from "storeTypes";

import {
  $products,
  productsLoad,
  wsConnect,
  wsDisconnect,
} from "../../../store/products";
import Categories from "../../filters/Categories";
import FilterBar from "../../filters/FilterBar";
import Table from "../../grid/Table";
import Loader from "../Loader";

import {
  Button,
  ProductsWrap,
  Header,
  BottomPanel,
  NoData,
  ErrorData,
} from "./styles";

const Products = () => {
  const products = useStore($products);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    void productsLoad();
    wsConnect();
    socketRef.current = products.socket;
    return () => {
      wsDisconnect();
    };
  }, [products.socket]);

  let showedArray: ShowedArray =
    products.selectedParentMarket === "starred"
      ? "starredData"
      : "filteredData";
  showedArray = products.searchQuery.length > 0 ? "searchedData" : showedArray;

  return (
    <>
      {products.loading && <Loader />}
      {products.error ? <ErrorData>{products.error.message}</ErrorData> : null}
      {products.loaded && (
        <>
          <Header>
            <Categories />
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
                  onClick={() => {
                    wsDisconnect();
                  }}
                >
                  Disconnect WebSocket
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    wsConnect();
                  }}
                >
                  Connect WebSocket
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
