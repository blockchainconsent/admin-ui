/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const express = require('express');

const authHandler = require('../handlers/auth');
const consentHandler = require('../handlers/consent');
const userHandler = require('../handlers/user');

const router = express.Router();

// proxy to the auth APIs
router.post('/login', authHandler.login);
router.get('/logout', authHandler.logout);

router.post('/consent', consentHandler.fetchConsent);
router.get('/consent/patient', consentHandler.fetchPatientData);

router.post('/forgotPassword', userHandler.forgotPassword);

/*
 * EXAMPLE: proxy to secured APIs
 * To secure a route, add the checkAuth() function between the route name and the handler function.
 * checkAuth will determine if the next middleware function (handler) can be invoked
 */
// router.post('/some_route', checkAuth, some_handler);

module.exports = router;
