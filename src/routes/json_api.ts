// These endpoints are to be called directly, and do not return pages.

import path from 'path';
import createDebug from 'debug';
import { NextFunction, Response, Request, Router } from 'express';
import { addPage, deletePage, getAllPages, getPage, createId, updatePage, findPages } from '../logic';
import { PageUserEditableFields } from '../types';
import { cfg } from '../globals';

createDebug.enable('tooru:*');
const debug = createDebug('tooru:jsonapi');

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
    const pages = await getAllPages();

    set_dl(req, res, 'tooru-pages');
    res.json(pages);
  });

  // POST new page
  router.post('/pages/new/', async (req: Request, res: Response, _next: NextFunction) => {
    const pageFields: PageUserEditableFields = req.body;

    const newId = await addPage(pageFields);

    const redirUrl = path.posix.join(cfg.appRoot, '/pages/', newId, '/');
    res.status(201).set('Location', redirUrl).end();
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

      const page = await getPage(id);
      debug('got page:', page);
      if (!page) {
        res.status(404).end();
        return;
      }

      set_dl(req, res, id);
      res.json(page);
    })
    .put(async (req: Request, res: Response, _next: NextFunction) => {
      const id = req.params.id;
      const pageFields: PageUserEditableFields = req.body;
      await updatePage(id, pageFields);

      res.status(204).end();
    })
    .delete(async (req: Request, res: Response, _next: NextFunction) => {
      const id = req.params.id;
      await deletePage(id);

      res.status(204).end();
    });

  router.post('/parse/', async (req: Request, res: Response, _next: NextFunction) => {
    const foundPages = await findPages(req.body);
    res.json(foundPages);
  });

  return router;
};

export default setupRouter();
