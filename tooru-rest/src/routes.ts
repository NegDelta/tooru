// These endpoints are to be called directly, and do not return pages.

import { tooruDebug } from './utils';
import { NextFunction, Response, Request, Router } from 'express';
import {
  PageCollectionGetResponse,
  PageGetResponse,
  PageParsePostResponse,
  PagePostRequest,
  PageJsonParseResult
} from 'tooru-common';
import { addPage, deletePage, getAllPages, getPage, createId, updatePage, findPages } from './logic';

const debug = tooruDebug('jsonapi');

const set_dl = (req: Request<unknown, unknown, unknown, { dl?: string }>, res: Response, filename: string) => {
  if ((req.query.dl || '') === '1') {
    res.set('Content-disposition', 'attachment; filename="' + filename + '.json"');
  }
};

const setupRouter = () => {
  const router = Router();

  router.post('/dummy/', (req: Request, res: Response, _next: NextFunction) => {
    res.json(req.body);
  });

  router.get('/timetoid/', (req: Request, res: Response, _next: NextFunction) => {
    res.redirect('./0');
  });

  router.get('/timetoid/:dupes/', (req: Request, res: Response, _next: NextFunction) => {
    const ids = createId(Date.now().valueOf(), Number(req.params.dupes));
    res.json(ids.output);
  });

  // GET all pages
  router.get('/pages/', async (req: Request, res: Response, _next: NextFunction) => {
    const pagesRes = await getAllPages();
    const pages: PageCollectionGetResponse = pagesRes;

    set_dl(req, res, 'tooru-pages');
    res.json(pages);
  });

  // POST new page
  router.post('/pages/new/', async (req: Request, res: Response, _next: NextFunction) => {
    const pageFields: PagePostRequest = req.body;

    const newId = await addPage(pageFields);

    res.status(200).send(newId);
  });

  // GET, PUT (edit), DELETE a given page
  router
    .route('/pages/:id([\\d-]+)/')
    .all((req: Request, res: Response, next: NextFunction) => {
      // catch-all for all verbs
      next();
    })
    .get(async (req: Request, res: Response, _next: NextFunction) => {
      const id = req.params.id;

      const pageRes = await getPage(id);
      debug('got page:', pageRes);
      if (!pageRes) {
        res.status(404).end();
        return;
      }
      const page: PageGetResponse = pageRes;

      set_dl(req, res, id);
      res.json(page);
    })
    .put(async (req: Request, res: Response, _next: NextFunction) => {
      const id = req.params.id;
      const pageFields: PagePostRequest = req.body;
      await updatePage(id, pageFields);

      res.status(204).end();
    })
    .delete(async (req: Request, res: Response, _next: NextFunction) => {
      const id = req.params.id;
      await deletePage(id);

      res.status(204).end();
    });

  router.post('/parse/', async (req: Request, res: Response, _next: NextFunction) => {
    const matchesRes: PageJsonParseResult = await findPages(req.body);
    const matches: PageParsePostResponse = matchesRes;
    res.json(matches);
  });

  return router;
};

export default setupRouter();
