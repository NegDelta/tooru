import nconf from 'nconf';

nconf.argv().env().file({ file: 'config.json' });

interface Config {
  appRoot: string;
  dbpool: {
    host: string;
    user: string;
    password: string;
    database: string;
    connectionLimit: number;
    connectTimeout: number;
  };
}

export const cfg: Config = nconf.get();
