'use strict';


import express from 'express';
const router = express.Router();

import Profile from './profile_model.js'
import auth from './middleware.js';


  router.get('/profile/:id', auth, (req,res,next) => {
  Profile
    .findById(req.params.id)
    .then( profile => res.send(profile) )
    .catch( next );
});

router.post('/profile', auth, (req, res, next) => {
    let profile = new Profile (req.body);
    profile.userID = user._id;
    profile.save()
      .then( profile => res.send(profile) )
      .catch(next);
  });

router.put('/profile', (req, res, next) => {
  Profile
    .findByIdAndUpdate(req.params.id, req.body)
    .then( profile => res.send(profile) )
    .catch( next );
});

router.delete('/profile/:id', (req, res) => {
  Profile
    .findByIdAndRemove(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});