'use strict';

const utils = require('../utils/writer.js');
const Global = require('../service/GlobalService');

module.exports.publicGetImg = function publicGetImg(req, res, next) {
    const imgName = req.swagger.params['imgName'].value;
    Global.publicGetImg(imgName)
        .then(function (response) {
            const img = require('fs').readFileSync(response);
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(img, 'binary');
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getDialogInfo = function getDialogInfo(req, res, next) {
    const body = req.swagger.params['body'].value;
    Global.getDialogInfo(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
module.exports.getDialogMsgs = function getDialogMsgs(req, res, next) {
    const body = req.swagger.params['body'].value;
    Global.getDialogMsgs(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getLastMsg = function getLastMsg(req, res, next) {
    const body = req.swagger.params['body'].value;
    Global.getLastMsg(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.sendMsg = function sendMsg(req, res, next) {
    const body = req.swagger.params['body'].value;
    Global.sendMsg(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
