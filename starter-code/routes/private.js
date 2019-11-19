'use strict';

const { Router } = require('express');
const router = new Router();

const routeGuard = require('./../middleware/route-guard');

// Private Page
// Set a controller for the private page,
// preceded by the middleware that prevents unauthenticated users to visit
router.get('/', routeGuard, (req, res, next) => {
  res.render('private');
});

// Export the router that should be mounted in the app
module.exports = router;