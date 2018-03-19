/* global describe, it, before */

import chai from 'chai';
import {LightspeedApi} from '../lib/lightspeed-api.js';
const Resource = require('../src/resources/base');

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of Lightspeed Api library', () => {
  before(() => {
    lib = new LightspeedApi({
      clientId: '<clientId>',
      clientSecret: '<clientSecret>',
      refreshToken: '<refreshToken>',
      accountId: '<accountId>'
    });
  });

  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('LightspeedApi');
    });
  });


  describe('when I need the baseURL', () => {
    it('should return the base URL', () => {
      expect(lib.baseURL).to.be.equal('https://api.merchantos.com/API/Account');
    });
  });

  describe("returns the correct type of object", ()=> {
    it('should return a LightspeedAPI Object', () => {
      expect(lib).to.be.instanceOf(LightspeedApi)
    });
  })
  // describe('when I want to call a resource resource("item").find', () => {
  //   it('should return the request Promise', () => {
  //     expect(lib.item.find).to.be.an.instanceOf(Promise);
  //   });
  // });
});

describe('when I want to call resource("item") on Lightspeed', () => {
  // before(() => {
    let lib = new LightspeedApi({
      clientId: '<clientId>',
      clientSecret: '<clientSecret>',
      refreshToken: '<refreshToken>',
      accountId: '<accountId>'
    });
    let resource = lib.resource('item');
    let resource2 = lib.resource('category');
  // });

  describe("returns an object with correct properties", ()=> {

    it('should return an object', () => {
      expect(resource).to.be.a('object')
    });

    it('should have the name of the resource set', () => {
      expect(resource._resourceName).to.be.equal('Item')
      expect(resource2._resourceName).to.be.equal('Category')
    });
  })


});

describe('when I call an endpoint on a resource("item") on Lightspeed', () => {
  // before(() => {
  let lib = new LightspeedApi({
    clientId: '<clientId>',
    clientSecret: '<clientSecret>',
    refreshToken: '<refreshToken>',
    accountId: '<accountId>'
  });
  let resource = lib.resource('item');
  // });
  //
  // describe(".all", ()=> {
  //
  //   it('should return a promise', () => {
  //     expect(resource).to.be.a('promise')
  //   });
  //
  // })


});
