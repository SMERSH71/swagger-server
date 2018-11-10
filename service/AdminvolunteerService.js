'use strict';


/**
 * Удалить цитату
 *
 * qot_id Integer ID цитаты
 * returns inline_response_200_7
 **/
exports.delQuote = function (qot_id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Получить список цитат с подробной информацией
 *
 * returns inline_response_200_5
 **/
exports.getAllQuotes = function () {
    return new Promise(function (resolve, reject) {
        var examples = {};
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
}


/**
 * Получить список диалогов с информацией о них (с теми, у которые никто не обслуживает, но при этом они не привязаны к заявке)
 *
 * sender_id Integer ID пользователя, чьи диалоги необходимо получить
 * returns inline_response_200_4
 **/
exports.getListDialogs = function (sender_id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
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
}


/**
 * Авторизация в системе для администраторов и волонтеров
 *
 * body Body_4 email пользователя и хеш пароля
 * returns inline_response_200_3
 **/
exports.login = function (body) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "vol_name": "Сергиенко Дмитрий Владимирович",
            "vol_admin": false,
            "vol_id": 2,
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Создание диалога
 *
 * body Body_7 ID волонтеров (администратор относится к волонтерам), которые будут задействованы в диалоге
 * returns inline_response_200_8
 **/
exports.setDialog = function (body) {
    return new Promise(function (resolve, reject) {
        var examples = {};
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
}


/**
 * Создать цитату
 *
 * body Body_5 Данные цитаты
 * returns inline_response_200_6
 **/
exports.setQuote = function (body) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "qot_id": 6,
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Обновить цитату
 *
 * body Body_6 Данные цитаты
 * returns inline_response_200_7
 **/
exports.updQuote = function (body) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Получить загрузить картинку
 *
 * upfile File Файл для загрузки (картинка)
 * returns inline_response_200_9
 **/
exports.uploadImg = function (upfile) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "imgUrl": "https://pp.userapi.com/c851528/v851528769/352b7/bGRSJ7rmJR0.jpg",
            "status": "OK"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

