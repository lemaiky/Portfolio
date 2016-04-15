var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  res.render('userlist', { title: 'userlist' });
});

router.post('/changePage', function(req, res) {
	res.redirect("/helloworld");
});

router.post('/linkedin', function(req, res) {
	res.redirect("http://linkedin.com/lemaiky");
});

module.exports = router;
