/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_JWT_TOKEN: string
  readonly VITE_SERVER_URL: string
  readonly VITE_API_MODE: 'mock' | 'external'

}
