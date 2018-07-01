'use strict';

const superagent = require('superagent');
const app = require('../src/app.js');

import Profile from '../src/profile_model.js';

const API_URL = '/profile';

describe('api module', () => {

    const PORT = 8888;
    beforeAll( () => {
      app.start(PORT);
    });
    afterAll( () => {
      app.stop();
    });

  it('gets a 200 response on an existing model', () => {
    return superagent.get(API_URL)
      .auth('john','foo')
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('handles an invalid get request with a 404', () => {

    return superagent.get('/api/v1/profiles/blah')
      .then()
      .catch(res => expect(res.status).toEqual(404));

  });

  it(' on POST should respond with bad request if no request body was provided', () => {
    return superagent.post(API_URL)
      .catch(response => {
        expect(response.statusCode).toEqual(400);
      })
      .catch(console.err);
  });

  it('on POST should respond with bad request if request body was invalid', () => {
    let obj = {};
    return superagent.post(API_URL)
      .send(obj)
      .catch(response => {
        expect(response.statusCode).toEqual(400);
      })
      .catch(console.err);
  });

});

describe('profile', () => {

  it('should post an profile', () => {

    const profileObj = {
      faveColor: 'blue',
      faveCookie: 'snickerdoodle',
    };

    return superagent
      .post(API_URL)
      .send(profileObj)
      .then(results => {

        try {
          const profile = JSON.parse(results.text);
          expect(profile.faveColor).toBe(profileObj.faveColor);
          expect(profile.faveCookie).toBe(profileObj.faveCookie);
          expect(profile._id).toBeDefined();
        } catch (error) {
          throw(error);
        }
      }).catch(err => console.log(err));
  });

  it('should add to all profiles after a post', () => {

    const profileObj = {
      faveColor: 'grey',
      faveCookie: 'chocolate chip',
    };

    return superagent
      .post(API_URL)
      .send(profileObj)
      .then(() => {

        return superagent
          .get(API_URL)
          .then(results => JSON.parse(results.text))
          .then(profiles => expect(profiles.length).toBe(1))
          .catch(err => console.log(err));
      });

  });

  it('should find one profile by id', () => {

    const profileObj = {
      faveColor: 'purple',
      faveCookie: 'white chocolate macadamia nut',
    };

    return Profile.create(profileObj).then(data => {

      return Profile.findById(data._id).then(profile => {

        expect(profile.name).toEqual(profileObj.name);

      }).catch(err => console.log(err));

    }).catch(err => console.log(err));
  });

});