'use-strict';

// TODO require all predefined resources
const capitalize = require('lodash/capitalize');
const EventEmitter = require('events');

import {BasicResource, Item} from './resources';
import {LeakyBucket} from './utils';

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
