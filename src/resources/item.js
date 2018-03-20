import { Resource } from './base';

export class Item extends Resource {

  constructor(resourceName) {
    super(resourceName);
    this._paramKey = 'itemCode';
  }
}
