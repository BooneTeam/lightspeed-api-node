const axios = require('axios');
const OauthGrant = require('./ouath-grant');

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

      // let aPromise = new Promise((resolve2, reject2) => {
      //   this.makeCall().then((res) => {
      //     this.lightspeed.updateLimits(res.headers);
      //     resolve2(res)
      //   }).catch((err) => {
      //     this.lightspeed.updateLimits(err.headers);
      //     reject2(err)
      //   });
      // });

      return this.lightspeed.bucket.throttle(cost, this);

      //     this.lightspeed.bucket.throttle(cost, () => {
      //       // this.lightspeed.bucket.throttle(cost, new Promise((resolve, reject) => {
      //       new OauthGrant(this.lightspeed).then((respo) => {
      //         this.makeCall().then((res) => {
      //           this.lightspeed.updateLimits(res.headers);
      //           resolve(resolve2(res));
      //           // resolve(res);
      //         }).catch((err) => {
      //           this.lightspeed.updateLimits(err.headers);
      //           reject(reject2(err));
      //           // reject(err)
      //         });
      //       }).catch((err) => {
      //         console.log('wtf2', err)
      //         // throw new Error(err);
      //       });
      //     });
      //     // }));
      //   });
      //   return aPromise;
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
    }
  }

  makeCall() {
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

    return req;
  }

  // TODO make this throttle test
}
