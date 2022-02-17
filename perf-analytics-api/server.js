const express = require('express');
const app = express();
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Analytics = require('./models');

const port = 5000;
const url = 'mongodb+srv://trendyol:tm3b0S9iNzgyephG@cluster0.1upom.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const connect = mongoose.connect(url);

connect
  .then(() => console.log('MongoDB Connected Correctly'))
  .catch(err => console.log(err));

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'false',
  'Access-Control-Allow-Methods': 'POST, GET',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  'Content-Type': 'application/json'
};

let requestCount = 0;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.all('/', (req, res, next) => {
  res.header(headers);
  requestCount++;
  if ( req.method === 'GET' || req.method === 'POST' || req.method === 'OPTIONS') {
    next();
  } else {
    res.statusCode = 405;
    return res.end();
  }

})
  .get('/', (async (req, res) => {
    try {
    const { beginTime, endTime } = req.query;

    const data = await Analytics.find({
      $and:
        [
          {
            createdAt:
              { $gt: Number(beginTime) }
          },
          {
            createdAt:
              { $lte: Number(endTime) }
          }
        ]
    }).lean().limit(1000);

    return res.status(200).send(JSON.stringify(data));
  } catch(e) {
    return res.status(500).send(JSON.stringify(e));
  }}))
  .post('/', (async (req, res) => {
    res.header(headers);
    
    req.body.forEach((document) => {
      const { url, analyticType, time, startTime } = document;
      const newAnalytics = Analytics({
        url,
        analyticType,
        time,
        startTime,
        createdAt: new Date().getTime()
      });
      newAnalytics.save((err, analytic) => {
        if ( err ) {
          res.statusCode = 500;
          console.log(err);
          res.end();
        } else {
          console.log("analytic", analytic);
          res.statusCode = 200;
          res.end();
        }
      })
    });
  }))

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`PerfAnalytics API running...`);
})

module.exports = app;
