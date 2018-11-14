'use strict';

const MethodDB = require('../db_method/MethodClient');
const knex = require('../index').knex;
const webshot = require('webshot');
const uniqid = require('uniqid');

/**
 * Создание диалога (НЕ привязанного к заявке) клиентом
 *
 * cli_id Integer ID клиента
 * returns inline_response_200_8
 **/
exports.clientSetDialog = function (cli_id) {

    const TAG = "clientSetDialog";

    const this_dialog = {
        cli_id: cli_id,
        dlg_begindt: new Date()
    };

    return new Promise(function (resolve) {
        const result = {};
        result['application/json'] = {
            "dlg_id": null,
            "status": "SERVER ERROR"
        };

        MethodDB.insertDialog(knex, this_dialog)
            .then((res) => {
                console.log(TAG + " -> result: good");
                result['application/json'] = {
                    "dlg_id": res[0],
                    "status": "OK"
                };
            })
            .catch((err) => {
                console.error(TAG + " -> result: " + err);
                result['application/json'] = {
                    "dlg_id": null,
                    "status": "ERROR"
                };
            })
            .finally(() => {
                resolve(result[Object.keys(result)[0]]);
            });
    });
};


/**
 * Создать клиента и получить его ID
 *
 *
 * body Client Данные клиента
 * returns inline_response_200_11
 **/
exports.getClient = function (body, IP) {
    const TAG = "getClient";

    // Создание записи посещения для хранения в БД
    const this_cilent =
        {
            cli_ip: IP,
            cli_fullname: body.cli_fullname,
            cli_email: body.cli_email,
            cli_phone: body.cli_phone,
            cli_address: body.cli_address,
            cli_passeries: body.cli_passeries,
            cli_pasnumber: body.cli_pasnumber,
            cli_pasissued: body.cli_pasissued,
            cli_pasdateissued: body.cli_pasdateissued,
            cli_pasdeviscode: body.cli_pasdeviscode
        };

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "cli_id": null,
            "status": "SERVER ERROR"
        };

        try {
            MethodDB.insertClient(knex, this_cilent)
                .then((res) => {
                    console.log(TAG + " -> result: good");
                    result['application/json'] = {
                        "cli_id": res[0],
                        "status": "OK"
                    };
                })
                .catch((err) => {
                    console.error(TAG + " -> result: " + err);
                    result['application/json'] = {
                        "cli_id": null,
                        "status": "ERROR"
                    };
                })
                .finally(() => {
                    resolve(result[Object.keys(result)[0]]);
                });
        }
        catch (err) {
            result['application/json'] = {
                "cli_id": null,
                "status": "SERVER ERROR"
            };
            console.error(TAG + " -> result: " + err);
            reject(result[Object.keys(result)[0]]);
        }
    });
};


/**
 * Получить скриншот от сервера
 *
 *
 * uRL String URL ресурса, скриншот которого необходимо получить
 * returns inline_response_200_10
 **/
exports.getScreen = function (uRL, host) {
    const TAG = "getScreen";

    const options = {
        streamType: 'png',
        windowSize: {
            width: 1920,
            height: 1080
        },
        shotSize: {
            width: 'all',
            height: 1080
        }
    };

    const imgName = uniqid();

    const result = {};
    result['application/json'] = {
        "imgsource": null,
        "status": "SERVER ERROR"
    };

    return new Promise(function (resolve, reject) {
        webshot(uRL, "./public/" + imgName + "." + options.streamType, options, (err) => {
            if (err) {
                console.error(TAG + " -> result: " + err);
                result['application/json'] = {
                    "imgsource": null,
                    "status": "ERROR"
                };

                reject(result[Object.keys(result)[0]]);
            }
            console.log(TAG + " -> result: good");
            result['application/json'] = {
                "imgsource": host + "/public/" + imgName + "." + options.streamType,
                "status": "OK"
            };
            resolve(result[Object.keys(result)[0]]);
        });
    });

};


/**
 * Создание диалога, привязанного к заявке
 *
 * body Body_8 ID запроса и ID клиента
 * returns inline_response_200_8
 **/
exports.setDialogForRqt = function (body) {
    const TAG = "setDialogForRqt";

    const this_dialog = {
        cli_id: body.cli_id,
        dlg_begindt: new Date()
    };

    return new Promise(function (resolve) {
        const result = {};
        result['application/json'] = {
            "dlg_id": null,
            "status": "SERVER ERROR"
        };

        MethodDB.insertDialog(knex, this_dialog)
            .then((res) => MethodDB.updRequestDlg(knex, res[0], body.rqt_id, body.cli_id))
            .then((res) => {
                if (res.length === 0) throw new Error("Invalid update parameter dlg_id for request");
                console.log(TAG + " -> result: good");
                result['application/json'] = {
                    "dlg_id": res[0],
                    "status": "OK"
                };
            })
            .catch((err) => {
                console.error(TAG + " -> result: " + err);
                result['application/json'] = {
                    "dlg_id": null,
                    "status": "ERROR"
                };
            })
            .finally(() => {
                resolve(result[Object.keys(result)[0]]);
            });
    });
};


/**
 * Создать заявку по ID клиента
 *
 *
 * body Request Данные заявки
 * returns inline_response_200_12
 **/
exports.setRequest = function (body) {
    const TAG = "setRequest";

    const this_request =
        {
            cli_id: body.cli_id,
            rqt_url: body.rqt_url,
            rqt_comment: body.rqt_comment,
            rqt_imgsource: body.rqt_imgsource,
            rqt_dt: new Date(),
            rqt_blockedstatus: 0,
            rqt_status: 0
        };

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "rqt_id": null,
            "status": "SERVER ERROR"
        };

        try {
            MethodDB.insertRequest(knex, this_request)
                .then((res) => {
                    console.log(TAG + " -> result: good");
                    result['application/json'] = {
                        "rqt_id": res[0],
                        "status": "OK"
                    };
                })
                .catch((err) => {
                    console.error(TAG + " -> result: " + err);
                    result['application/json'] = {
                        "rqt_id": null,
                        "status": "ERROR"
                    };
                })
                .finally(() => {
                    resolve(result[Object.keys(result)[0]]);
                });
        }
        catch (err) {
            result['application/json'] = {
                "rqt_id": null,
                "status": "SERVER ERROR"
            };
            console.error(TAG + " -> result: " + err);
            reject(result[Object.keys(result)[0]]);
        }
    });
};

