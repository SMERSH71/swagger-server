'use strict';
const fs = require('fs');
const uniqid = require('uniqid');
const MethodDB = require('../db_method/MethodAdminVolunteer');
const knex = require('../index').knex;

/**
 * Удалить цитату
 *
 * qot_id Integer ID цитаты
 * returns inline_response_200_7
 **/
exports.delQuote = function (qot_id) {
    return new Promise(function (resolve, reject) {
        const examples = {};
        examples['application/json'] = {
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};


/**
 * Получить список цитат с подробной информацией
 *
 * returns inline_response_200_5
 **/
exports.getAllQuotes = function () {
    return new Promise(function (resolve, reject) {
        const examples = {};
        examples['application/json'] = {
            "array_qot": [{
                "qot_id": 6,
                "qot_countlikes": 0,
                "qot_textvisibility": false,
                "qot_imgsource": "http://voice-gen-220-900.appspot.com/quote1.jpg",
                "qot_author": "Уильям Шекспир",
                "qot_text": "Ад пуст. Все бесы здесь.",
                "qot_countshare": 0
            }, {
                "qot_id": 6,
                "qot_countlikes": 0,
                "qot_textvisibility": false,
                "qot_imgsource": "http://voice-gen-220-900.appspot.com/quote1.jpg",
                "qot_author": "Уильям Шекспир",
                "qot_text": "Ад пуст. Все бесы здесь.",
                "qot_countshare": 0
            }],
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};


/**
 * Получить список диалогов с информацией о них (с теми, у которые никто не обслуживает, но при этом они не привязаны к заявке)
 *
 * sender_id Integer ID пользователя, чьи диалоги необходимо получить
 * returns inline_response_200_4
 **/
exports.getListDialogs = function (sender_id) {
    return new Promise(function (resolve, reject) {
        const examples = {};
        examples['application/json'] = {
            "list_dialogs": [{
                "last_msg": {
                    "msg_text": "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
                    "msg_dt": "2018-11-04T00:42:36-03:00",
                    "msg_id": 5,
                    "msg_fromyou": true
                },
                "role": "Volunteer",
                "interlocutor": "Петров Александр",
                "create_dt": "2018-11-04T01:55:36-03:00",
                "dlg_id": 4
            }, {
                "last_msg": {
                    "msg_text": "Здравстуйте! Подскажите, пожалуйста, лучший наркологический диспансер в Липецке",
                    "msg_dt": "2018-11-04T00:42:36-03:00",
                    "msg_id": 5,
                    "msg_fromyou": true
                },
                "role": "Volunteer",
                "interlocutor": "Петров Александр",
                "create_dt": "2018-11-04T01:55:36-03:00",
                "dlg_id": 4
            }],
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};


/**
 * Авторизация в системе для администраторов и волонтеров
 *
 * body Body_4 email пользователя и хеш пароля
 * returns inline_response_200_3
 **/
exports.login = function (body) {
    const TAG = "login";

    const this_data = {
        vol_email: body.email,
        vol_hashpass: body.hashpass
    };

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "vol_fullname": null,
            "vol_admin": null,
            "vol_id": null,
            "status": "SERVER ERROR"
        };

        MethodDB.accessCheck(knex, this_data)
            .then((res) => {
                if (res.length === 0) throw new Error("Not Found");
                console.log(TAG + " -> result: good");
                result['application/json'] = {
                    "vol_fullname": res[0].vol_fullname,
                    "vol_admin": res[0].vol_admin,
                    "vol_id": res[0].vol_id,
                    "status": "OK"
                };
            })
            .catch((err) => {
                console.error(TAG + " -> resilt: " + err);
                result['application/json'] = {
                    "vol_fullname": null,
                    "vol_admin": null,
                    "vol_id": null,
                    "status": "ERROR"
                };
                if (err.message === "Not Found") {
                    result['application/json'] = {
                        "vol_fullname": null,
                        "vol_admin": null,
                        "vol_id": null,
                        "status": "NOT FOUND"
                    };
                }
            })
            .finally(() => {
                resolve(result[Object.keys(result)[0]]);
            });
    });
};


/**
 * Создание диалога
 *
 * body Body_7 ID волонтеров (администратор относится к волонтерам), которые будут задействованы в диалоге
 * returns inline_response_200_8
 **/
exports.setDialog = function (body) {
    return new Promise(function (resolve, reject) {
        const examples = {};
        examples['application/json'] = {
            "dlg_id": 4,
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};


/**
 * Создать цитату
 *
 * body Body_5 Данные цитаты
 * returns inline_response_200_6
 **/
exports.setQuote = function (body) {
    const TAG = "setQuote";

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "qot_id": null,
            "status": "SERVER ERROR"
        };

        body.qot_countlikes = 0;

        MethodDB.insertQuote(knex, body)
            .then((res) => {
                if (res.length === 0) throw new Error('Invalid Insert');
                console.log(TAG + " -> result: good");
                result['application/json'] = {
                    "qot_id": res[0],
                    "status": "OK"
                };
            })
            .catch((err) => {
                console.error(TAG + " -> result: " + err);
                result['application/json'] = {
                    "qot_id": null,
                    "status": "ERROR"
                };
            })
            .finally(() => {
                resolve(result[Object.keys(result)[0]]);
            });
    });
};


/**
 * Обновить цитату
 *
 * body Body_6 Данные цитаты
 * returns inline_response_200_7
 **/
exports.updQuote = function (body) {
    return new Promise(function (resolve, reject) {
        const examples = {};
        examples['application/json'] = {
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};


/**
 * Получить загрузить картинку
 *
 * upfile File Файл для загрузки (картинка)
 * returns inline_response_200_9
 **/
exports.uploadImg = function (upfile, host) {
    const TAG = "uploadImg";

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "imgUrl": null,
            "status": "SERVER ERROR"
        };

        try {
            let mimetype = null;
            switch (upfile.mimetype) {
                case "image/jpeg":
                    mimetype = ".jpeg";
                    break;
                case "image/gif":
                    mimetype = ".gif";
                    break;
                case "image/png":
                    mimetype = ".png";
                    break;
            }

            if (mimetype === null)
            {
                console.error(TAG + " -> result: Invalid MimeType");
                result['application/json'] = {
                    "imgUrl": null,
                    "status": "ERROR"
                };
                reject(result[Object.keys(result)[0]]);
            }

            const imgUid = uniqid('upload_');
            fs.writeFile('./public/' + imgUid + mimetype, upfile.buffer, (err) => {
                if(err) {
                    console.error(TAG + " -> result: " + err);
                    result['application/json'] = {
                        "imgUrl": null,
                        "status": "ERROR"
                    };
                    reject(result[Object.keys(result)[0]]);
                }
                console.log(TAG + " -> result: good");
                result['application/json'] = {
                    "imgUrl": host + "/public/" + imgUid + mimetype,
                    "status": "OK"
                };

                resolve(result[Object.keys(result)[0]]);
            });
        }
        catch (err) {
            console.error(TAG + " -> result: " + err);
            result['application/json'] = {
                "imgUrl": null,
                "status": "ERROR"
            };
            reject(result[Object.keys(result)[0]]);
        }
    });
};

