const express = require('express');

const AuthenticationService = require('../../service/authenticationService');

const Response = require('./response/response');
const Logger = require('../../util/logger');

const router = express.Router();

router.post('/', async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        Response.response_200(req, res, AuthenticationService.login({
            ...req.headers,
        }), {
            dataFieldName: 'token'
        });
    } catch (error) {
        Response.error(req, res, error);
    }
});

module.exports = router;