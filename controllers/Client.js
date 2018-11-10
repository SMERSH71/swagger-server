'use strict';

const utils = require('../utils/writer.js');
const Client = require('../service/ClientService');

function getCallerIP(request) {
    var ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1)[0]; //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
    return ip;
}

module.exports.clientSetDialog = function clientSetDialog(req, res, next) {
    const cli_id = req.swagger.params['cli_id'].value;
    Client.clientSetDialog(cli_id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getClient = function getClient(req, res, next) {
    const body = req.swagger.params['body'].value;
    Client.getClient(body, getCallerIP(req))
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getScreen = function getScreen(req, res, next) {
    var uRL = req.swagger.params['URL'].value;
    Client.getScreen(uRL, req.headers.host)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.setDialogForRqt = function setDialogForRqt(req, res, next) {
    var body = req.swagger.params['body'].value;
    Client.setDialogForRqt(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.setRequest = function setRequest(req, res, next) {
    var body = req.swagger.params['body'].value;
    Client.setRequest(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
