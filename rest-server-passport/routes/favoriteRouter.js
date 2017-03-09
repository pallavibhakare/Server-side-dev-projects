var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
	    Favorites.find({
			postedBy: req.decoded._doc._id
		})
        .populate('postedBy dishes')		
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
	var userId = req.decoded._doc._id;
    Favorites.findOneAndUpdate({
		postedBy :userId
	},{
		$addToSet:{dishes:req.body}
	},{
		upsert:true,
		new: true
	},function (err, favorite) {
            if (err) throw err;            
            res.json(favorite);
	});
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.remove({'postedBy':req.decoded._doc._id}, function (err, resp) {
        if (err) throw err;
        res.json("Deleted All Favorites!");
    });
})
favoriteRouter.route('/:dishObjectId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOneAndUpdate({
      postedBy: req.decoded._doc._id
    }, {
      $pull: {
        dishes: req.params.dishObjectId
      }
    }, {
      new: true // this returns the new document after update, without this will return the old one
    }, function (err, favorite) {
      if (err) throw err;

      res.json(favorite);
    });
    
});



module.exports = favoriteRouter;