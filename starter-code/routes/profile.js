'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.render('profile');
  });

module.exports = router;