'use strict';

const { Router } = require('express');
const router = Router();

const User = require('./../models/user');
const bcryptjs = require('bcryptjs');

router.get('/', (req, res, next) => {
    res.render('sign-in');
  });
  
  router.post('/', (req, res, next) => {
    let userId;
    const { username, password } = req.body;
    console.log(username)
    User.findOne({ username })
      .then(user => {
        if (!user) {
          return Promise.reject(new Error("There's no user with that username."));
        } else {
          userId = user._id;
          return bcryptjs.compare(password, user.passwordHash);
        }
      })
      .then(result => {
        if (result) {
          req.session.user = userId;
          res.redirect('/');
        } else {
          return Promise.reject(new Error('Wrong password.'));
        }
      })
      .catch(error => {
        next(error);
      });
  });

  module.exports = router;