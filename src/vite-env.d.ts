/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REST_API_URL: string;
  readonly VITE_WEBSOCKET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
