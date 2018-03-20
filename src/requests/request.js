const axios = require('axios');

export default class Request {
  constructor(httpMethod, url, lightspeed, data) {
    // Todo change this to not be args and make it options
    this._method = httpMethod;
    this.url = url;
    this.data = data;
    this.lightspeed = lightspeed;

    function checkLimits() {
      // TODO make this check rate limit
      return true;
    }

    if (checkLimits()) {
      let cost = this.calculateCost();

      return this.lightspeed.bucket.throttle(cost, this);
    }
  }

  calculateCost() {
    switch (this._method) {
      case 'GET':
        return 5;
      case 'POST':
        return 10;
      case 'PUT':
        return 10;
      case 'DELETE':
        return 10;
      default:
        return 10;
    }
  }

  makeCall() {
    return new Promise((resolve, reject) => {
      // This needs to be throttled with the request
      let request = {
        method: this._method,
        url: this.url,
        headers: {
          'Authorization': `Bearer ${this.lightspeed.accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        params: {},
        data: JSON.stringify(this.data) || {}
      };

      let req = axios(request);

      resolve(req);

    });

  }
}
