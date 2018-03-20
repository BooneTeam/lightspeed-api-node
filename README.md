# Lightspeed-Api-Node

Node library for Lightspeed API

## Features

* Auto Rate Limiting
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/). - Not thoroughly tested yet
* Linting with [ESLint](http://eslint.org/).

*Have in mind that you have to build your library before publishing. The files under the `lib` folder are the ones that should be distributed.*

## Getting started

1. Define your auth config

        let lib = new LightspeedApi({
          clientId: 'yourID',
          clientSecret: 'yourSecret',
          refreshToken: 'yourRefreshToken',
          accountId: 'yourAccountID'
        });
   
2. Call a resource
        
       
        let item = lib.resource('item');
        <!--  Returns a promise -->
        
        item.then((response) => { console.log(response) })
        
3. Resources
  
  * Not all resources have defined methods/classes
  * find, update, delete, all are defined on any resource dynamically if the resource URL is standard.
     * ie: 
              
              lib.resource('category').find(1)
       this will create a BasicResource which tries to call "/Category/1.json"
       if there are special keys they need to be defined in the library.
       Check resources/item.js for an example.


4. Running the tests
  * Run `yarn test` or `npm run test`

## Scripts

* `yarn build` or `npm run build` - produces production version of your library under the `lib` folder
* `yarn dev` or `npm run dev` - produces development version of your library and runs a watcher
* `yarn test` or `npm run test` - well ... it runs the tests :)
* `yarn test:watch` or `npm run test:watch` - same as above but in a watch mode
