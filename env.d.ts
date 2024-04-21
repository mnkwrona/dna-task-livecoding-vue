/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL2: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
