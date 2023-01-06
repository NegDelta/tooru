import axios from 'axios';
import {
  PageCollectionGetResponse,
  PageGetResponse,
  PageParsePostResponse,
  PagePostRequest,
  PagePostResponse
} from 'tooru-common';
import { cfg } from './globals';
import { tooruwebDebug } from './utils';

const debug = tooruwebDebug('rest');

debug(`created axios instance for ${cfg.restRoot}`);

const axiosInstance = axios.create({
  baseURL: cfg.restRoot,
  timeout: 1000
});

const getPages = async (): Promise<PageCollectionGetResponse> => {
  return (await axiosInstance.get('pages/')).data;
};

const postNewPage = async (pageData: PagePostRequest): Promise<PagePostResponse> => {
  return (await axiosInstance.post('pages/new/', pageData)).data;
};

const getPage = async (id: string): Promise<PageGetResponse> => {
  return (await axiosInstance.get(`pages/${id}/`)).data;
};

const putPage = async (id: string, pageData: PagePostRequest): Promise<void> => {
  return (await axiosInstance.put(`pages/${id}/`, pageData)).data;
};

const deletePage = async (id: string): Promise<void> => {
  return (await axiosInstance.delete(`pages/${id}/`)).data;
};

const postParse = async (dump?: string): Promise<PageParsePostResponse> => {
  return (await axiosInstance.post('parse/', dump)).data;
};

export default {
  getPages,
  postNewPage,
  getPage,
  putPage,
  deletePage,
  postParse
};
