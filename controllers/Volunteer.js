'use strict';

const utils = require('../utils/writer.js');
const Volunteer = require('../service/VolunteerService');

module.exports.closeRequest = function closeRequest (req, res, next) {
    const body = req.swagger.params['body'].value;
    Volunteer.closeRequest(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getRequest = function getRequest(req, res, next) {
    const body = req.swagger.params['body'].value;
    Volunteer.getRequest(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
