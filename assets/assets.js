'use strict';

const config = require('../config.json');
console.log('Launching asset collection scripts at port:', config.rpc_port);

// DB
var db = require('monk')('localhost/' + config.database);
// var uniqueAccountsCollection = db.get('uniqueAccounts');
// var uniqueIDSCollection = db.get('uniqueIDS');
// uniqueIDSCollection.drop();
// uniqueAccountsCollection.drop();

// COMPONENTS
var feeds = require('./components/feeds');
var assets = require('./components/assets');
var trxChart = require('./components/transactionChart');
var accountsChart = require('./components/accountsCharts');
var price = require('./components/price');
var supply = require('./components/supply');
var forks = require('./components/forks');

// INTERVALS
setInterval(feeds.launchFeedUpdate, 1000 * 60);
setInterval(assets.launchAssetUpdate, 1000 * 20);
setInterval(forks.update, 1000 * 60 * 5);
setInterval(feeds.feedHistory, 1000 * 60 * 30);
setInterval(accountsChart.update, 1000 * 60 * 30);
setInterval(accountsChart.updateUnique, 1000 * 60);
setInterval(price.update, 1000 * 60 * 30);
setInterval(supply.update, 1000 * 60 * 30);
setInterval(price.updateMetaX, 1000 * 30);

setInterval(function() {
  trxChart.update('hourly', 0);
}, 1000 * 60 * 10);

setInterval(function() {
  trxChart.update('daily', 1);
}, 1000 * 60 * 60 * 2);

setInterval(function() {
  trxChart.update('weekly', 2);
}, 1000 * 60 * 60 * 24);

setInterval(function() {
  accountsChart.update('daily', 1);
}, 1000 * 60 * 60 * 2);

// SINGLE LAUNCH
trxChart.update('hourly', 0);
// feeds.launchFeedUpdate();
// setInterval(assets.updateAll, 1000 * 60 * 30);
// supply.update();

// accountsChart.update('daily',1);
// assets.updateAll();

