[![Build Status](https://travis-ci.com/stariel/17-bearer-authorization.svg?branch=master)](https://travis-ci.com/stariel/17-bearer-authorization)
17: Bearer Auth
===


## Requirements

## Description
- The *profile* profile stores the favorite color (faveColor) and cookie (faveCookie) of each User. It also stores the user `_id` of the user who was logged in to the push request.

## Server Endpoints

### `/api/profile-name`
* `POST` request
* pass data as stringifed JSON in the body of a post request to create a new profile

### `/api/profile-name/:id`
* `GET` request
* pass the id of a profile though the url endpoint to `req.params` to fetch a profile   
* `PUT` request
* pass data as stringifed JSON in the body of a put request to update a profile
* `DELETE` request
* pass the id of a profile though the url endpoint *(using `req.params`)* to delete a profile  

//still working on tests

## Tests
* create a test to ensure that your API returns a status code of 404 for routes that have not been registered
* create a series of tests to ensure that your `/api/profile` endpoint responds as described for each condition below:
* `GET` - test **200**, for a request made with a valid id
* `GET` - test **401**, if no token was provided
* `GET` - test **404**, for a valid request with an id that was not found
* `PUT` - test **200**, for a post request with a valid body
* `PUT` - test **401**, if no token was provided
* `PUT` - test **400**, if the body was invalid
* `PUT` - test **404**, for a valid request made with an id that was not found
* `POST` - test **200**, for a post request with a valid body
* `POST` - test **401**, if no token was provided
* `POST` - test **400**, if no body was provided or if the body was invalid