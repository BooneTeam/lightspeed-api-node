const axios = require('axios');

export default class OauthGrant {
  constructor(config) {
    this.lightspeed = config;

    if (this.expiredToken) {
      return this.authorize().then((res) => {
        this.lightspeed.accessToken = res.data.access_token;
        this.lightspeed.tokenExpiresAt = res.data.expires_in + new Date().getTime() / 1000;
      }).catch((err) => {
        throw new Error(err);
        // debugger;
      });
    }
    // else {
    // debugger;
    // return Promise.new();
    // }
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
    debugger;
    return true;
    // if (!this.lightspeed.tokenExpiresAt){
    //   return true
    // } else if(((new Date().getTime() / 1000) - this.lightspeed.tokenExpiresAt) < new Date().getTime() / 1000){
    //   return false
    // }
  }
}
// Authorization: "Bearer #{LightspeedApi::OauthGrant.token}",
