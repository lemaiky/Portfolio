var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Mai-Khanh page' });
});

/* GET Resume page. */
router.get('/about', function(req, res) {
  res.render('about', { title: 'About' });
});

/* GET Projects page. */
router.get('/work', function(req, res) {
  res.render('work', { title: 'Work' });
});

/* POST redirect to linkedin */
router.post('/linkedin', function(req, res) {
	res.redirect("http://linkedin.com/lemaiky");
});

module.exports = router;
