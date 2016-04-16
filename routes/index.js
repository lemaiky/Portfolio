var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mai-Khanh page' });
});

/* GET Resume page. */
router.get('/resume', function(req, res) {
  res.render('resume', { title: 'Resume' });
});

/* POST go to Hello World page*/
router.post('/changePage', function(req, res) {
	res.redirect("/resume");
});

/* POST redirect to linkedin */
router.post('/linkedin', function(req, res) {
	res.redirect("http://linkedin.com/lemaiky");
});

module.exports = router;
