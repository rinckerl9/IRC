var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.redirect('http://localhost:8081');
});

module.exports = router;
