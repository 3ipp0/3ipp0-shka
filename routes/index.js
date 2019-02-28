var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Doeslist page. */
router.get('/doeslist', function(req, res) {
    var db = req.db;
    var collection = db.get('doescollection');
    collection.find({},{},function(e,docs){
        res.render('doeslist', {
            "doeslist" : docs
        });
    });
});

/* GET New do page. */
router.get('/newdo', function(req, res) {
    res.render('newdo', { title: 'Add New Do' });
});

/* POST to Add Do Service */
router.post('/adddo', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var doName = req.body.do;
    // Set our collection
    var collection = db.get('doescollection');
    // Submit to the DB
    collection.insert({
        "do" : doName,
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("doeslist");
        }
    });
});

module.exports = router;
