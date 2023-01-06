export interface Page {
  title: string;
  lead: string;
  body: string;
  id: string;
  time: string;
  edit_time: string;
}

export interface PagePostRequest {
  title: string;
  lead: string;
  body: string;
}

export type PagePostResponse = string;
export type PageGetResponse = Page;
export type PageCollectionGetResponse = Page[];

export enum PageParseMatchQuality {
  SKIP,
  ERROR,
  WARNING,
  OK
}

export interface PageObjectParseResult {
  parsedPage?: Page;
  matchQuality: PageParseMatchQuality;
  message: string;
}

export interface PageJsonParseResult {
  matches: PageObjectParseResult[];
  message: string;
}
export type PageParsePostResponse = PageJsonParseResult;
