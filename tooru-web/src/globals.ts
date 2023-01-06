interface Config {
  appRoot: string;
  restRoot: string;
}

export const cfg: Config = {
  appRoot: import.meta.env.VITE_APP_ROOT ?? '',
  restRoot: import.meta.env.VITE_REST_ROOT ?? ''
};
