const express = require('express');

const authenticationMiddleware = require('./middleware/authenticationMiddleware');

const StateService = require('../../service/stateService');

const Response = require('./response/response');
const Logger = require('../../util/logger');

const router = express.Router();

router.get('/', authenticationMiddleware, async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        Response.response_200(req, res, await StateService.find({
            ...req.query,
        }));
    } catch (error) {
        Response.error(req, res, error);
    }
});

router.get('/:idState', authenticationMiddleware, async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        Response.response_200(req, res, await StateService.find({
            ...req.params,
        }));
    } catch (error) {
        Response.error(req, res, error);
    }
});

router.post('/', authenticationMiddleware, async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        await StateService.insert({
            ...req.body,
        });

        Response.response_200(req, res);
    } catch (error) {
        Response.error(req, res, error);
    }
});

router.put('/', authenticationMiddleware, async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        await StateService.update({
            ...req.body,
        });

        Response.response_200(req, res);
    } catch (error) {
        Response.error(req, res, error);
    }
});

router.delete('/:idState', authenticationMiddleware, async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        await StateService.delete({
            ...req.params,
        });

        Response.response_200(req, res);
    } catch (error) {
        Response.error(req, res, error);
    }
});

module.exports = router;