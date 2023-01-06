export type SqlPagesSchema = {
  id: string;
  time: string;
  edit_time: string;
  title: string;
  lead: string;
  body: string;
};

export type SqlSelectPagesResult = SqlPagesSchema[];

export type SqlSelectDupesResult = [
  {
    dupes: string;
  }
];

export type QueryParametersList = unknown[];
