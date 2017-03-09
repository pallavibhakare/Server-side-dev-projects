var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Leadership = require('../models/leadership');


var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(function (req, res, next) {
    Leadership.find({}, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.post(function (req, res, next) {
    Leadership.create(req.body, function (err, leader) {
        if (err) throw err;
        console.log('Leader is created!');
        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leader with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Leadership.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leaderRouter.route('/:leadshipId')
.get(function (req, res, next) {
    Leadership.findById(req.params.leadshipId, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.put(function (req, res, next) {
    Leadership.findByIdAndUpdate(req.params.leadshipId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete(function (req, res, next) {
    Leadership.findByIdAndRemove(req.params.leadshipId, function (err, resp) {       
	if (err) throw err;
        res.json(resp);
    });
});

module.exports = leaderRouter;