'use strict';

const { Router } = require('express');
const router = Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

router.get('/:userId/editProfile', routeGuard, (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
      .then(user => {
        if (user === req.session.user) {
          res.render('/editProfile', { user });
        } else {
          next(new Error('User has no permission to edit post.'));
        }
      })
      .catch(error => {
        next(error);
      });
  });
  
  router.post('/:userId/editProfile', routeGuard, (req, res, next) => {
    const userId = req.params.userId;
  
    User.findOneAndUpdate(
      {
        _id: userId,
        username: req.session.user
      }
    )
      .then(data => {
        res.redirect(`/${userId}`);
      })
      .catch(error => {
        next(error);
      });
  });

module.exports = router;