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

    // this.tokenExpiresAt = new Date().getTime() / 1000;

    this._name = 'LightspeedApi';
    this._baseURL = 'https://api.merchantos.com/API/Account';
    this._oauthURL = 'https://cloud.merchantos.com/oauth/access_token.php';

    // Default
    this.bucket = new LeakyBucket({current: 60}, this);
    
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
  

  get baseURL() {
    return this._baseURL;
  }

  get name() {
    return this._name;
  }
}

let cat = lib.resource('item');

new Array(40).fill().forEach(function(poo, i){
  cat.find(1).then(function (r) {
    console.log(r.data);
    console.log(i);
  }).catch(function (e) {
    console.log(e)
  });
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
