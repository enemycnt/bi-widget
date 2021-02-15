import { mergeDeep, addOrRemove } from "../helpers/utils";

const REST_API_URL =
  "https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products";

const WEBSOCKET_URL = "wss://stream.binance.com/stream?streams=!miniTicker@arr";

export function products(store) {
  store.on("@init", () => ({
    products: {
      showStarred: false,

      selectedCategory: "BTC",
      selectedParentMarket: "BTC",

      searchQuery: "",

      changeOrVolume: "change",

      socketEstablished: false,
      socketOpen: false,
      socket: {},

      parentCategories: [],
      data: [],
      filteredData: [],
      starredData: [],
      searchedData: [],

      loading: false,
      loaded: false,
      error: null,
    },
  }));

  store.on("products/toggleStarred", ({ products }) => {
    const selectedParentMarket = "starred";

    return {
      products: {
        ...products,
        selectedParentMarket,
      },
    };
  });

  store.on("products/addToStarred", ({ products }, item) => {
    const starredData = addOrRemove(products.starredData, item);
    return {
      products: {
        ...products,
        starredData,
      },
    };
  });

  store.on("products/search", (state, searchQuery) => {
    const searchedData =
      searchQuery !== ""
        ? state.products.data.filter((el) =>
            `${el.b}/${el.q}`.includes(searchQuery.toUpperCase())
          )
        : state.products.data;
    return {
      products: {
        ...state.products,
        searchedData,
        searchQuery,
      },
    };
  });

  store.on("products/selectedColumn", (state, column) => {
    return {
      products: {
        ...state.products,
        changeOrVolume: column,
      },
    };
  });

  store.on(
    "products/selectedCategory",
    ({ products }, { category, parentMarket }) => {
      const filterNone = (x) => x;
      const filterByParentMarket = (market) => (products) =>
        products.filter((el) => el.pm === market);
      const filterByCategory = (category) => (products) =>
        products.filter((el) => el.q === category);
      const filteredData = [
        parentMarket.length > 0
          ? filterByParentMarket(parentMarket)
          : filterNone,
        category.length > 0 ? filterByCategory(category) : filterNone,
      ].reduce((result, f) => f(result), products.data);

      return {
        products: {
          ...products,
          selectedCategory: category,
          selectedParentMarket: parentMarket,
          filteredData,
        },
      };
    }
  );

  store.on("products/ws/connect", (state) => {
    const socket = new WebSocket(WEBSOCKET_URL);
    socket.onopen = function (event) {
      // Listen for messages
      socket.onmessage = function (event) {
        const payload = JSON.parse(event.data);
        store.dispatch("products/ws/save", payload.data);
      };

      socket.onclose = function (e) {
        store.dispatch("products/ws/disconnect");
      };
    };
    return {
      products: {
        ...state.products,
        socket,
        socketEstablished: true,
        socketOpen: true,
      },
    };
  });

  store.on("products/ws/disconnect", (state) => {
    state.products.socket.close();
    return {
      products: {
        ...state.products,
        socketOpen: false,
      },
    };
  });

  store.on("products/load", async (state) => {
    store.dispatch("products/loading");

    let products = {};
    try {
      await fetch(REST_API_URL)
        .then((response) => response.json())
        .then((resp) => {
          products = resp.data;
        });
      store.dispatch("products/save", products);
      store.dispatch("products/ws/connect");
    } catch (e) {
      console.error(e);
      store.dispatch("errors/server-error", e);
    }
  });

  store.on("products/loading", (state) => {
    return {
      products: {
        ...state.products,
        loading: true,
      },
    };
  });

  store.on("errors/server-error", (state, err) => {
    return {
      products: {
        ...state.products,
        loading: false,
        loaded: false,
        error: err,
      },
    };
  });

  
  store.on("products/save", (state, products) => {
    const parentCategories = products.reduce((res, cur) => {
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
    }, {});

    return {
      products: {
        ...state.products,
        parentCategories,

        data: products,
        filteredData: products,
        loading: false,
        loaded: true,
      },
    };
  });

  store.on("products/ws/save", (state, products) => {
    const prevPoductsKeyed = state.products.filteredData.reduce(
      (acc, cur) => ({ ...acc, [cur.s]: cur }),
      {}
    );
    const newProductsKeyed = products.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.s]: {
          c: parseFloat(cur.c),
          h: parseFloat(cur.h),
          l: parseFloat(cur.l),
          o: parseFloat(cur.o),
          qv: parseFloat(cur.q),
          s: cur.s,
          v: parseFloat(cur.v),
        },
      }),
      {}
    );

    const merged = mergeDeep(prevPoductsKeyed, newProductsKeyed);
    const values = Object.values(merged);

    return {
      products: {
        ...state.products,
        filteredData: values,
        loading: false,
        loaded: true,
      },
    };
  });
}
