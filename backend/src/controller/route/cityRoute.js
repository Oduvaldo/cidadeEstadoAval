const express = require('express');

const authenticationMiddleware = require('./middleware/authenticationMiddleware');

const CityService = require('../../service/cityService');

const Response = require('./response/response');
const Logger = require('../../util/logger');

const router = express.Router();

router.get('/', authenticationMiddleware, async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        Response.response_200(req, res, await CityService.find({
            ...req.query,
        }));
    } catch (error) {
        Response.error(req, res, error);
    }
});

router.get('/:idCity', authenticationMiddleware, async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        Response.response_200(req, res, await CityService.find({
            ...req.params,
        }));
    } catch (error) {
        Response.error(req, res, error);
    }
});

router.post('/', authenticationMiddleware, async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        await CityService.insert({
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
        await CityService.update({
            ...req.body,
        });

        Response.response_200(req, res);
    } catch (error) {
        Response.error(req, res, error);
    }
});

router.delete('/:idCity', authenticationMiddleware, async (req, res) => {
    Logger.infoRequestRoute(req);

    try {
        await CityService.delete({
            ...req.params,
        });

        Response.response_200(req, res);
    } catch (error) {
        Response.error(req, res, error);
    }
});

module.exports = router;