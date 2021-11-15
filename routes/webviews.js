function setupRouter(logic_globals) {
  var express = require('express');
  var router = express.Router();
  
  /* GET home page. */
  router.get('/', function(req, res, next) {
    // all pages
    logic_globals.prom_getAllPages(res, (dbres) => {
      res.render('allpages', { pages: dbres });
    });
  });

  router.get('/pages/:id/', function(req, res, next) {
    logic_globals.prom_getPage(res, req.params.id, (dbres) => {
      res.render('onepage', { page: dbres[0] });
    });
  });
  
  router.get('/newpage/', function(req, res, next) {
    res.render('newpage');
  });
  
  router.get('/admin/', function(req, res, next) {
    res.render('adminindex', {
      cfgjson: JSON.stringify(logic_globals.cfg)
    })
  });

  return router;
}

module.exports = setupRouter;
