import { ItemType } from "ItemType";
import { StreamItem, StreamItemRaw } from "StreamItemType";
import { deepMap, action } from "nanostores";
import { ColumnType, ParentCategories, Product, Error } from "storeTypes";

import { addOrRemove, mergeDeep } from "../helpers/utils";

const { VITE_REST_API_URL: REST_API_URL, VITE_WEBSOCKET_URL: WEBSOCKET_URL } =
  import.meta.env;

export const $products = deepMap<Product>({
  showStarred: false,

  selectedCategory: "BTC",
  selectedParentMarket: "BTC",

  searchQuery: "",

  changeOrVolume: "change",

  socketEstablished: false,
  socketOpen: false,
  socket: null,

  parentCategories: [],
  data: [],
  filteredData: [],
  starredData: [],
  searchedData: [],

  loading: false,
  loaded: false,
  error: null,
});

export const productsSave = action(
  $products,
  "products/save",
  (store, products: Array<ItemType>) => {
    const parentCategories: ParentCategories = products.reduce(
      (res: ParentCategories, cur) => {
        if (res[cur.pn] !== undefined) {
          if (!res[cur.pn].includes(cur.q)) {
            res[cur.pn].push(cur.q);
          }
        } else {
          res = {
            ...res,
            [cur.pn]: [],
          };
        }
        return res;
      },
      {}
    );

    store.set({
      ...store.get(),
      parentCategories,
      data: products,
      filteredData: products,
      loading: false,
      loaded: true,
    });
  }
);

export const productsLoad = action(
  $products,
  "products/load",
  async (store) => {
    store.setKey("loading", true);

    let products: Array<ItemType> = [];
    try {
      await fetch(REST_API_URL)
        .then((response) => response.json())
        .then((resp: { data: unknown }) => {
          products = resp.data as Array<ItemType>;
        });
      productsSave(products);
    } catch (e) {
      console.error(e);
      store.set({
        ...store.get(),
        loading: false,
        loaded: false,
        error: e as Error,
      });
    }
  }
);

export const toggleStarred = action(
  $products,
  "products/toggleStarred",
  (store) => {
    const selectedParentMarket = "starred";
    store.setKey("selectedParentMarket", selectedParentMarket);
  }
);

export const addToStarred = action(
  $products,
  "products/addToStarred",
  (store, item: ItemType) => {
    const starredData = addOrRemove(store.get().starredData, item);
    store.setKey("starredData", starredData);
  }
);

export const search = action(
  $products,
  "products/search",
  (store, searchQuery: string) => {
    const searchedData =
      searchQuery !== ""
        ? store
            .get()
            .data.filter((el) =>
              `${el.b}/${el.q}`.includes(searchQuery.toUpperCase())
            )
        : store.get().data;
    store.set({ ...store.get(), searchedData, searchQuery });
  }
);

export const selectedColumn = action(
  $products,
  "products/selectedColumn",
  (store, column: string) => {
    const changeOrVolume = column as ColumnType;
    store.setKey("changeOrVolume", changeOrVolume);
  }
);

export const selectedCategory = action(
  $products,
  "products/selectedCategory",
  (
    store,
    { category, parentMarket }: { category: string; parentMarket: string }
  ) => {
    const filterNone = (products: Array<ItemType>) => products;
    const filterByParentMarket =
      (market: string) => (products: Array<ItemType>) =>
        products.filter((el) => el.pm === market);
    const filterByCategory =
      (category: string) => (products: Array<ItemType>) =>
        products.filter((el) => el.q === category);

    const filteredData = [
      parentMarket.length > 0 ? filterByParentMarket(parentMarket) : filterNone,
      category.length > 0 ? filterByCategory(category) : filterNone,
    ].reduce((result, f) => f(result), store.get().data);

    store.set({
      ...store.get(),
      selectedCategory: category,
      selectedParentMarket: parentMarket,
      filteredData,
    });
  }
);

export const wsConnect = action($products, "products/ws/connect", (store) => {
  const socket = new WebSocket(WEBSOCKET_URL);
  socket.onopen = function () {
    socket.onmessage = function (event: { data: unknown }) {
      const payload = JSON.parse(event.data as string) as {
        data: Array<StreamItemRaw>;
      };
      wsSave(payload.data);
    };
    socket.onclose = function () {
      // wsDisconnect();
    };
  };
  store.set({
    ...store.get(),
    socket,
    socketEstablished: true,
    socketOpen: true,
  });
});

export const wsDisconnect = action(
  $products,
  "products/ws/disconnect",
  (store) => {
    const { socket } = store.get();
    socket?.close();
    store.setKey("socketOpen", false);
    store.setKey("socket", null);
  }
);

export const wsSave = action(
  $products,
  "products/ws/save",
  (store, products: Array<StreamItemRaw>) => {
    const prevPoductsKeyed = store.get().filteredData.reduce(
      (res, cur) => {
        res[cur.s] = cur;
        return res;
      },
      {} as {
        [key: string]: ItemType;
      }
    );

    const newProductsKeyed = products.reduce(
      (acc, cur) => {
        acc[cur.s] = {
          c: parseFloat(cur.c),
          h: parseFloat(cur.h),
          l: parseFloat(cur.l),
          o: parseFloat(cur.o),
          qv: parseFloat(cur.q),
          s: cur.s,
          v: parseFloat(cur.v),
        };
        return acc;
      },
      {} as {
        [key: string]: StreamItem;
      }
    );
    const mergedProducts = mergeDeep(prevPoductsKeyed, newProductsKeyed);
    const values = Object.values(mergedProducts);
    store.setKey("filteredData", values);
  }
);
