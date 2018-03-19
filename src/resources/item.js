// const Resource = require('./resources/base');
import { Resource } from './base'
const Request = require('../requests/request');

export class Item extends Resource {

  constructor(resourceName){
    super(resourceName);
    this._paramKey = 'itemCode'
  }

}
