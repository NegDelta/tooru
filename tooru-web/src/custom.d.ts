declare module '*.svg' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_APP_ROOT: string;
  readonly VITE_REST_ROOT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
