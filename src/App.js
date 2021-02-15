import { StoreContext } from "storeon/react";
import { store } from "./store";

import Products from "./components/common/Products";
import Layout from "./components/common/Layout";

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Layout>
        <Products store={store} />
      </Layout>
    </StoreContext.Provider>
  );
}

export default App;
