'use-strict';
const qs = require('qs');
const Request = require('../requests/request');
const capitalize = require('lodash/capitalize');

export class Resource {
  constructor(resourceName) {
    this._resourceName = capitalize(resourceName);
  }

  all(query = {}, params = {}, body = {}) {
    const url = this.buildUrl('', params);

    return new Request('GET', url, this.lightspeed);
  }

  find(id, params, data = {}) {
    const url = this.buildUrl(id, params);

    if (this._paramKey) {
      data[this._paramKey] = id;
    }

    return new Request('GET', url, this.lightspeed, data);
  }

  buildUrl(id, query) {
    let path = `${this.lightspeed._baseURL}/${this.lightspeed._config.account_id}/${this._resourceName}`;

    if (id) { path += `/${id}`; }
    // .replace(/\/+/g, '/')
    // .replace(/\/$/, '');

    path += '.json';

    if (query) path += '?' + qs.stringify(query, {arrayFormat: 'brackets'});
    return path;
  }

}
