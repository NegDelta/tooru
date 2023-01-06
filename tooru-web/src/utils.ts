import path from 'path';
import createDebug from 'debug';
import { cfg } from './globals';

createDebug.enable('tooruweb:*');
export const tooruwebDebug = (name: string) => createDebug(`tooruweb:${name}`);

export const timeFormat = (timestr: string) => new Date(Number(timestr)).toDateString();

export const prettyTrim = (str: string, maxLength = 100) => {
  return str.length < maxLength ? str : str.substring(0, maxLength - 3) + `... (${str.length} total)`;
};

export const getPath = (...appPath: string[]) => path.posix.join(cfg.appRoot, ...appPath);

export const getRestPathQuery = (query: { [k: string]: string }, ...restPath: string[]) => {
  const url = new URL(cfg.restRoot);
  url.pathname = path.posix.join(url.pathname, ...restPath);
  Object.entries(query).forEach(([k, v]) => {
    url.searchParams.set(k, v);
  });
  return url.href;
};

export const getRestPath = (...restPath: string[]) => {
  const url = new URL(cfg.restRoot);
  url.pathname = path.posix.join(url.pathname, ...restPath);
  return url.href;
};

type FormDataEntryValue = ReturnType<FormData['getAll']>[number];
export const parseRequestForm = async <T>(request: Request) => {
  const formData = await request.formData();
  const result: { [k: string]: FormDataEntryValue } = {};
  formData.forEach((value, key) => {
    result[key] = value;
  });
  return result as T;
};
