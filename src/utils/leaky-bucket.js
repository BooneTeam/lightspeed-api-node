// const queue = require("queue");
// const async = require('async');
// const Queue = require('sync-queue');
const Queue = require('promise-queue');
const OauthGrant = require('../requests/ouath-grant');
export class LeakyBucket {

  constructor(options = {}) {
    this.dripRate = parseFloat(options['dripRate']) || 1;
    this.max = parseFloat(options['max']) || 60;
    this.current = parseFloat(options['current']) || 0;
    // this.queue = new Queue();
    this.queue = new Queue(1, Infinity);
    this.results = [];
    // this.asyncQueue =
    this.working = false;
  }

  throttle(cost = 1, request) {
    return this.queue.add(() => {
      return new Promise((resolve, rej) => {
        new OauthGrant(request.lightspeed).then((respo) => {
          console.log(cost)
          console.log(this.max)
          console.log(this.current)
          if (this.nextTotal(cost) >= this.max) {
            console.log('waiting ' + this.timeToWait(cost));
            setTimeout(function () {
              request.makeCall().then((res) => {
                request.lightspeed.updateLimits(res.headers)
                resolve(res);
              });
            }, this.timeToWait(cost));
          } else {
            request.makeCall().then((res) => {
              request.lightspeed.updateLimits(res.headers)
              resolve(res);
            });
          }
        })
      })
    });
  };

  runNext() {
    this.queue[0]()
  }

  // this.queueplace(() => {
  // if (this.nextTotal(cost) >= this.max) {
  //   console.log('waiting' + this.timeToWait(cost));
  //   setTimeout(function () {
  //     return 'poo'
  //   }, this.timeToWait(cost));
  // }
  // });
  // this.asyncQueue.push(cost, () => {
  //   console.log('TESTING');
  //   if (this.nextTotal(cost) >= this.max) {
  //     console.log('waiting' + this.timeToWait(cost));
  //     setTimeout(function(){ return promise }, this.timeToWait(cost));
  //   } else {
  //     return promise
  //   }
  // });

  // work();

  work() {
    this.runNext();
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
