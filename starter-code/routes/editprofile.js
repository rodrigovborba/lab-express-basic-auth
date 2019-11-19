'use strict';

const { Router } = require('express');
const router = Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

router.get("/", routeGuard, (req, res, next) => {
    User.findById(req.session.user)
      .then(profile => {
          res.render("editProfile", { profile });
      })
      .catch(error => {
        next(error);
      });
  });
  
  router.post('/', routeGuard, (req, res, next) => {
    //  mongoose.set('useFindAndModify', false);
    User.findByIdAndUpdate(req.session.user, {
        name: req.body.name
      })
      .then((user) => {
        res.redirect("/profile");
      })
      .catch(error => {
        next(error);
      });
   });

module.exports = router;