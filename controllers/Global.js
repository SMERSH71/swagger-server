'use strict';

const utils = require('../utils/writer.js');
const Global = require('../service/GlobalService');

module.exports.publicGetImg = function publicGetImg(req, res, next) {
    const TAG = "/public/{imgName}";

    const result = {};
    result['application/json'] = {
        "status": "ERROR"
    };
    const imgName = req.swagger.params['imgName'].value;
    Global.publicGetImg(imgName)
        .then((response) => {
            const mimeType = response.match(/.(jpeg|jpg|png|gif)$/)[1];
            const stat = require('fs').statSync(response);
            res.writeHead(200, {
                'Content-Type' : 'image/'+mimeType,
                'Content-Length': stat.size
            });
            require('fs').createReadStream(response).pipe(res);
            console.log(TAG + ' -> result: good');
            /*
            require('fs').readFile(response, 'binary', (err, img) => {
                if (err) {
                    console.error(TAG + ' -> result 1: ' + err);
                    utils.writeJson(res, result[Object.keys(result)[0]]);
                } else {
                    try {
                        const mimeType = response.match(/.(jpeg|jpg|png|gif)$/)[1];
                        console.log(TAG + ' -> result: good');
                        res.writeHead(200, {'Content-Type': 'image/' + mimeType});
                        res.end(img, 'binary');
                    }
                    catch (err) {
                        console.error(TAG + ' -> result 2: ' + err);
                        utils.writeJson(res, result[Object.keys(result)[0]]);
                    }
                }
            });
            */
        })
        .catch((err) => {
            console.error(TAG + ' -> result: ' + err);
            utils.writeJson(res, result[Object.keys(result)[0]]);
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
