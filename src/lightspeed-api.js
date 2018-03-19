'use-strict';

import {BasicResource, Item} from './resources';
// TODO require all predefined resources
// const Item = require('./resources/item');
const capitalize = require('lodash/capitalize');
const EventEmitter = require('events');
// const LeakyBucket = require('leaky-bucket');
import { LeakyBucket } from './utils';

const predefinedResources = {
  Item
};

export default class LightspeedApi extends EventEmitter {
  constructor(opts) {
    super();
    this._config = {
      client_id: opts['clientId'],
      client_secret: opts['clientSecret'],
      refresh_token: opts['refreshToken'],
      account_id: opts['accountId']
    };

    this.accessToken = null;
    this.tokenExpiresAt = new Date().getTime() / 1000;

    this._name = 'LightspeedApi';
    this._baseURL = 'https://api.merchantos.com/API/Account';
    this._oauthURL = 'https://cloud.merchantos.com/oauth/access_token.php';

    // Default
    this.bucket = new LeakyBucket({current: 58});


    this.bucketLevels = {
      dripRate: 1,
      bucketMax: 60,
      bucketCurrent: 0
    };

    EventEmitter.call(this);

    function validateConfig(config) {
      let vals = Object.values(config);

      if (vals.indexOf(undefined) === 1) {
        throw new Error('Missing or invalid options for API config');
      }
    }


    validateConfig(this._config);
  }

  resource(resourceName) {
    let myResource;

    if (predefinedResources[capitalize(resourceName)]) {
      myResource = new predefinedResources[capitalize(resourceName)](resourceName);
    } else {
      myResource = new BasicResource(resourceName);
    }

    Object.assign(myResource, {lightspeed: this});
    return myResource;
  }


  //
  // request(url, method, key, params){
  //   const options = assign({
  //     headers: { 'Accept':'application/json', 'Content-Type': 'application/json'  },
  //     timeout: 35,
  //     json: true,
  //     method
  //   }, url);
  //
  //   if(this.options.accessToken){
  //     option.headers['Authorization'] = `Bearer ${this.options.acccesToken}`
  //   }
  //
  //   if (params) {
  //     const body = key ? { [key]: params } : params;
  //
  //     options.headers['Content-Type'] = 'application/json';
  //     options.body = body;
  //   }
  //
  // }

  get baseURL() {
    return this._baseURL;
  }

  get name() {
    return this._name;
  }
}

LightspeedApi.prototype.updateLimits = function(header) {
  if (!header) return;
  // const limits = header.split('/').map(Number);
  // const callLimits = this.callLimits;
  const bucketLevels = this.bucketLevels;

  const dripRate = header['x-ls-api-drip-rate'];

  const bucketLevel = header['x-ls-api-bucket-level'];
  const bucket = bucketLevel.split('/');

  bucketLevels.dripRate = dripRate;
  bucketLevels.bucketMax = bucket[1];

  this.bucket.max = parseFloat(bucket[1]);
  this.bucket.dripRate = parseFloat(dripRate);
  this.bucket.current = parseFloat(bucket[0]);

  console.log('wtf')
  console.log(bucket, dripRate);
  bucketLevels.bucketCurrent = bucket[0];

  //
  // callLimits.remaining = limits[1] - limits[0];
  // callLimits.current = limits[0];
  // callLimits.max = limits[1];

  this.emit('bucketLevels', bucketLevels);
};

// Object.setPrototypeOf(LightspeedApi.prototype, EventEmitter.prototype);


cat.find(1).then(function (r) {
  console.log('it rans :(')
}).catch(function (e) {
  console.log(e)
});

cat.find(1).then(function (r) {
  console.log('it rans :(')
}).catch(function (e) {
  console.log(e)
});
cat.find(1).then(function (r) {
  console.log('it rans :(')
}).catch(function (e) {
  console.log(e)
});
cat.find(1).then(function (r) {
  console.log('it rans :(')
}).catch(function (e) {
  console.log(e)
});
cat.find(1).then(function (r) {
  console.log('it rans :(')
}).catch(function (e) {
  console.log(e)
});
cat.find(1).then(function (r) {
  console.log('it rans :(')
}).catch(function (e) {
  console.log(e)
});
debugger;




// OMG item has to be Item
// let itemResource = lib.resource('item').all();
// let categoryResource = lib.resource('category');
// debugger;

// .all().then(function(res){
// console.log(res.data)
// })
// console.log(ls)
// console.log(lib.resource('item').find(1));
// /Users/garrettboone/codes/lightspeed-api-node/lightspeed-api/node_modules/.bin/babel-node --inspect-brk src/test.js
