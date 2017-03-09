var express = require('express');
var morgan = require('morgan');
var dishModule = require('./dishRouter.js');
var promoModule = require('./promoRouter.js');
var leaderModule = require('./leaderRouter.js')

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use('/dishes', dishModule.router);
app.use('/promotions', promoModule.router);
app.use('/leadership', leaderModule.router);

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

