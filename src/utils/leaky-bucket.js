const Queue = require('promise-queue');
const OauthGrant = require('../requests/ouath-grant');

export class LeakyBucket {

  constructor(options = {}, lightspeed) {
    this.dripRate = parseFloat(options['dripRate']) || 1;
    this.max = parseFloat(options['max']) || 60;
    this.current = parseFloat(options['current']) || 0;
    this.queue = new Queue(1, Infinity);
    this.lightspeed = lightspeed;
  }

  throttle(cost = 1, request) {
    // Don't like calling .makeCall() and having to put OauthGrant in here.
    return this.queue.add(() => {
      return new Promise((resolve, rej) => {
        setTimeout(() => {
          if (this.nextTotal(cost) >= this.max) {
            setTimeout(() => {
              console.log(this.lightspeed);
              new OauthGrant(this.lightspeed).then((respo) => {
                request.makeCall().then((res) => {
                  console.log(res.headers);
                  this.updateLimits(res.headers);
                  resolve(res);
                }).catch((err) => {
                  debugger;
                  console.log(err)
                });
              });
            },this.timeToWait(cost));
          } else {
            new OauthGrant(this.lightspeed).then((respo) => {
              request.makeCall().then((res) => {
                console.log(res.headers)
                this.updateLimits(res.headers);
                resolve(res);
              })
            }).catch((err) => {
              debugger;
            });
          }
        }, 0);
      })
    });
  };

  updateLimits(header) {
    if (!header) return;

    const dripRate = header['x-ls-api-drip-rate'];

    const bucketLevel = header['x-ls-api-bucket-level'];
    const bucket = bucketLevel.split('/');

    this.max = parseFloat(bucket[1]);
    this.max -= 10; // Stay 10 away from limit just in case other services are using same endpoint and api keys.

    this.dripRate = parseFloat(dripRate);
    this.current = parseFloat(bucket[0]);

    // this.emit('bucketLevels', bucketLevels);
  };

  nextTotal(cost) {
    console.log('IN NEXT TOTAL', cost + this.current);
    return cost + this.current;
  }

  timeToWait(cost) {
    let over = this.nextTotal(cost) - this.max;
    console.log('We would be over by ' + over);
    return (over / this.dripRate) * 1000;
  }

}
