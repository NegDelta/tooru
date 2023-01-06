import React from 'react';
import { PageJsonParseResult } from 'tooru-common';

export interface FormJsonToActionsProps {
  parseResult: PageJsonParseResult;
  filename: string;
}

export const FormJsonToActions = ({ parseResult, filename }: FormJsonToActionsProps) => {
  const foundPages = parseResult.matches;
  return (
    <>
      <h1>Pages found in {filename}:</h1>
      <ul>
        {foundPages.map((page) => (
          <li>{JSON.stringify(page)}</li>
        ))}
        {foundPages.length === 0 && <li>None</li>}
      </ul>
    </>
  );
};
