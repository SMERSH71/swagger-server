'use strict';

const utils = require('../utils/writer.js');
const Adminvolunteer = require('../service/AdminvolunteerService');

module.exports.delQuote = function delQuote(req, res, next) {
    const qot_id = req.swagger.params['qot_id'].value;
    Adminvolunteer.delQuote(qot_id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getAllQuotes = function getAllQuotes(req, res, next) {
    Adminvolunteer.getAllQuotes()
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getListDialogs = function getListDialogs(req, res, next) {
    const sender_id = req.swagger.params['sender_id'].value;
    Adminvolunteer.getListDialogs(sender_id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.login = function login(req, res, next) {
    const body = req.swagger.params['body'].value;
    Adminvolunteer.login(body)
        .then(function (response) {
            res.setHeader("Set-Cookie", "token=" + response.token);
            utils.writeJson(res, response.data);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.setDialog = function setDialog(req, res, next) {
    const body = req.swagger.params['body'].value;
    Adminvolunteer.setDialog(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.setQuote = function setQuote(req, res, next) {
    const body = req.swagger.params['body'].value;
    Adminvolunteer.setQuote(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.updQuote = function updQuote(req, res, next) {
    const body = req.swagger.params['body'].value;
    Adminvolunteer.updQuote(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.uploadImg = function uploadImg(req, res, next) {
    const upfile = req.swagger.params['upfile'].value;
    Adminvolunteer.uploadImg(upfile, req.headers.host)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
