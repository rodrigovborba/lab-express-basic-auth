'use strict';

const { Router } = require('express');
const router = Router();

const User = require('./../models/user');
const bcryptjs = require('bcryptjs');

router.get('/', (req, res, next) => {
    res.render('sign-up');
});

router.post('/', (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    bcryptjs
        .hash(password, 10)
        .then(hash => {
            return User.create({
                username,
                passwordHash: hash
            });
        })
        .then(user => {
            console.log('Created user', user);
            req.session.user = user._id;
            res.redirect('/');
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;