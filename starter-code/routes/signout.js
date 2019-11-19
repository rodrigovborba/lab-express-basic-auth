'use strict';

const { Router } = require('express');
const router = Router();

router.post('/', (req, res, next) => {
    // When user submits form to sign out,
    // destroy the session
    req.session.destroy();
    res.redirect('/');
  });

  module.exports = router;