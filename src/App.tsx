import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import Layout from "./components/common/Layout";
import Products from "./components/common/Products";

const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

const clientSideEmotionCache = createEmotionCache();

function App() {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Layout>
        <Products />
      </Layout>
    </CacheProvider>
  );
}

export default App;
