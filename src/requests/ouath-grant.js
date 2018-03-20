const axios = require('axios');

export default class OauthGrant {
  constructor(config) {
    this.lightspeed = config;

    if (this.expiredToken()) {
      return this.authorize().then((res) => {
        this.lightspeed.accessToken = res.data.access_token;
        this.lightspeed.tokenExpiresAt = res.data.expires_in + new Date().getTime() / 1000;
      }).catch((err) => {
        throw new Error(err);
      });
    }
    return new Promise((res, reject) => {
      res(this);
    }).catch((err) => {
      throw new Error(err);
    });

  }

  authorize() {
    return axios({
      method: 'post',
      url: `${this.lightspeed._oauthURL}`,
      headers: {'Content-Type': 'application/json'},

      // Data is Body with axios

      data: Object.assign(this.lightspeed._config, {'grant_type': 'refresh_token'})
    });
  }

  expiredToken() {
    if (!this.lightspeed.tokenExpiresAt) {
      return true;
    } else if (((new Date().getTime() / 1000) - this.lightspeed.tokenExpiresAt) < new Date().getTime() / 1000) {
      return false;
    }
    return true;
  }
}
