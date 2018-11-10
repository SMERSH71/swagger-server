'use strict';
const path = require('path');
const MethodDB = require('../db_method/MethodGlobal');
const knex = require('../index').knex;
/**
 * Возвращает картинку из папки public
 *
 * imgName String Имя картинки
 * returns File
 **/
exports.publicGetImg = function (imgName) {
    return new Promise(function (resolve) {
        resolve(path.join(__dirname, '../public', imgName));
    });
};


/**
 * Получить информацию о диалоге
 *
 * body Body_3 ID диалога и ID отправителя
 * returns inline_response_200_2
 **/
exports.getDialogInfo = function (body) {
    const TAG = "getDialogInfo";

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "last_msg": null,
            "role": null,
            "interlocutor": null,
            "create_dt": null,
            "status": "SERVER ERROR"
        };

        let data = {
            role: null,
            interlocutor: null,
            lat_msg: null,
            create_dt: null
        };

        MethodDB.selectDialog(knex, body.dlg_id)
            .then((res) => {
                if (res.length === 0) throw new Error("Not Found Dialog");
                data.create_dt = res[0].dlg_begindt;
                if (res[0].cli_id === body.msg_sendercliid && body.msg_sendervolid === undefined) {
                    // Мы cli, определяем есть ли vol1 с нами в диалоге
                    if (res[0].vol1_id === null) {
                        // Собеседника нет
                        return null;
                    }
                    else {
                        // Роль Волонтер ID res[0].vol1_id
                        data.role = "Volunteer";
                        return MethodDB.selectVolInfo(knex, res[0].vol1_id);
                    }
                }
                if (res[0].vol1_id === body.msg_sendervolid && body.msg_sendercliid === undefined) {
                    // Мы vol1, определяем кто с нами в диалоге cli или vol2
                    if (res[0].cli_id !== null) {
                        // Роль Клиент ID res[0].cli_id
                        data.role = "Client";
                        return MethodDB.selectClientInfo(knex, res[0].cli_id);
                    }
                    if (res[0].vol2_id !== null) {
                        // Роль Волонтер ID res[0].vol2_id
                        data.role = "Volunteer";
                        return MethodDB.selectVolInfo(knex, res[0].vol2_id);
                    }
                }
                if (res[0].vol2_id === body.msg_sendervolid && body.msg_sendercliid === undefined) {
                    // Роль Волонтер ID res[0].vol1_id
                    data.role = "Volunteer";
                    return MethodDB.selectVolInfo(knex, res[0].vol1_id);
                }
                if (res[0].vol1_id === null && res[0].vol2_id === null &&
                    body.msg_sendercliid === undefined && body.msg_sendervolid !== undefined) {
                    // Роль Клиент ID res[0].cli_id
                    data.role = "Client";
                    return MethodDB.selectClientInfo(knex, res[0].cli_id);
                }
                throw new Error("No Access");
            })
            .then((res) => {
                if (res !== null) {
                    if (res.length === 0) throw new Error("Not Found User");
                    if (data.role === "Volunteer") {
                        if (res[0].vol_admin) {
                            data.role = "Admin";
                        }
                        data.interlocutor = res[0].vol_fullname;
                    }
                    if (data.role === "Client") {
                        data.interlocutor = res[0].cli_fullname;
                    }
                }
                return MethodDB.selectDialogLastMsg(knex, body.dlg_id);
            })
            .then((res) => {
                if (res.length !== 0) {
                    const el = res[0];
                    if (el.msg_sendercliid != null && body.msg_sendercliid !== undefined &&
                        el.msg_sendercliid === body.msg_sendercliid) {
                        Object.defineProperty(el, 'msg_fromyou',
                            Object.getOwnPropertyDescriptor(el, 'msg_sendercliid'));
                        delete el['msg_sendercliid'];
                        delete el['msg_sendervolid'];
                        el.msg_fromyou = true;
                    } else {
                        if (el.msg_sendervolid != null && body.msg_sendervolid !== undefined &&
                            el.msg_sendervolid === body.msg_sendervolid) {
                            Object.defineProperty(el, 'msg_fromyou',
                                Object.getOwnPropertyDescriptor(el, 'msg_sendervolid'));
                            delete el['msg_sendercliid'];
                            delete el['msg_sendervolid'];
                            el.msg_fromyou = true;
                        }
                        else {
                            delete el['msg_sendercliid'];
                            delete el['msg_sendervolid'];
                            el.msg_fromyou = false;
                        }
                    }
                    data.lat_msg = el;
                }
                console.log(TAG + " -> result: good");
                result['application/json'] = {
                    "last_msg": data.lat_msg,
                    "role": data.role,
                    "interlocutor": data.interlocutor,
                    "create_dt": data.create_dt,
                    "status": "OK"
                };
            })
            .catch((err) => {
                console.error(TAG + " -> result: " + err);
                result['application/json'] = {
                    "last_msg": null,
                    "role": null,
                    "interlocutor": null,
                    "create_dt": null,
                    "status": "ERROR"
                };
                if (err.message === "Not Found Dialog") {
                    result['application/json'] = {
                        "last_msg": null,
                        "role": null,
                        "interlocutor": null,
                        "create_dt": null,
                        "status": "NOT FOUND DLG"
                    };
                }
                if (err.message === "No Access") {
                    result['application/json'] = {
                        "last_msg": null,
                        "role": null,
                        "interlocutor": null,
                        "create_dt": null,
                        "status": "NO ACCESS"
                    };
                }
                if (err.message === "Not Found User") {
                    result['application/json'] = {
                        "last_msg": null,
                        "role": null,
                        "interlocutor": null,
                        "create_dt": null,
                        "status": "NOT FOUND USR"
                    };
                }
            })
            .finally(() => {
                resolve(result[Object.keys(result)[0]]);
            });
    });
};


/**
 * Получить все сообщения диалога
 *
 * body Body_2 ID диалога и ID отправителя
 * returns inline_response_200_1
 **/
exports.getDialogMsgs = function (body) {
    const TAG = "getDialogMsgs";

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "array_msg": [],
            "status": "SERVER ERROR"
        };
        try {
            MethodDB.selectDialog(knex, body.dlg_id)
                .then((res) => {
                    if (res.length === 0) throw new Error("Not Found Dialog");
                    if ((res[0].cli_id === body.msg_sendercliid && body.msg_sendervolid === undefined) ||
                        ((res[0].vol1_id === body.msg_sendervolid || res[0].vol2_id === body.msg_sendervolid ||
                            (res[0].vol1_id === null && res[0].vol2_id === null && body.msg_sendervolid !== undefined))
                            && body.msg_sendercliid === undefined))
                        return MethodDB.selectDialogMsgs(knex, body.dlg_id);
                    else return null;
                })
                .then((res) => {
                    if (res === null) throw new Error("No Access");
                    if (res.length === 0) {
                        console.log(TAG + "  -> result: good");
                        result['application/json'] = {
                            "array_msg": [],
                            "status": "OK"
                        };
                    }
                    else {
                        res.forEach((el) => {
                            if (el.msg_sendercliid != null && body.msg_sendercliid !== undefined &&
                                el.msg_sendercliid === body.msg_sendercliid) {
                                Object.defineProperty(el, 'msg_fromyou',
                                    Object.getOwnPropertyDescriptor(el, 'msg_sendercliid'));
                                delete el['msg_sendercliid'];
                                delete el['msg_sendervolid'];
                                el.msg_fromyou = true;
                                return;
                            }
                            if (el.msg_sendervolid != null && body.msg_sendervolid !== undefined &&
                                el.msg_sendervolid === body.msg_sendervolid) {
                                Object.defineProperty(el, 'msg_fromyou',
                                    Object.getOwnPropertyDescriptor(el, 'msg_sendervolid'));
                                delete el['msg_sendercliid'];
                                delete el['msg_sendervolid'];
                                el.msg_fromyou = true;
                                return;
                            }
                            delete el['msg_sendercliid'];
                            delete el['msg_sendervolid'];
                            el.msg_fromyou = false;
                        });
                        console.log(TAG + " -> result: good");
                        result['application/json'] = {
                            "array_msg": res,
                            "status": "OK"
                        };
                    }
                })
                .catch((err) => {
                    console.error(TAG + "  -> result: " + err);
                    if (err.message === "Not Found Dialog") {
                        result['application/json'] = {
                            "array_msg": [],
                            "status": "NOT FOUND"
                        };
                    }
                    if (err.message === "No Access") {
                        result['application/json'] = {
                            "array_msg": [],
                            "status": "NO ACCESS"
                        };
                    }
                })
                .finally(() => {
                    resolve(result[Object.keys(result)[0]]);
                });
        }
        catch (err) {
            console.error(TAG + " -> result: " + err);
            reject(result[Object.keys(result)[0]]);
        }
    });
};


/**
 * Получить последнее сообщение в диалоге
 *
 * body Body_1 ID диалога и ID отправителя
 * returns inline_response_200_1
 **/
exports.getLastMsg = function (body) {
    const TAG = "getLastMsg";

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "last_msg": null,
            "status": "SERVER ERROR"
        };

        MethodDB.selectDialog(knex, body.dlg_id)
            .then((res) => {
                if (res.length === 0) throw new Error("Not Found Dialog");
                if ((res[0].cli_id === body.msg_sendercliid && body.msg_sendervolid === undefined) ||
                    ((res[0].vol1_id === body.msg_sendervolid || res[0].vol2_id === body.msg_sendervolid ||
                        (res[0].vol1_id === null && res[0].vol2_id === null && body.msg_sendervolid !== undefined))
                        && body.msg_sendercliid === undefined))
                    return MethodDB.selectDialogLastMsg(knex, body.dlg_id);
                else return null;
            })
            .then((res) => {
                if (res === null) throw new Error("No Access");
                console.log(TAG + " -> result: good");
                if (res.length === 0) {
                    result['application/json'] = {
                        "last_msg": null,
                        "status": "OK"
                    };
                }
                else {
                    const el = res[0];
                    if (el.msg_sendercliid != null && body.msg_sendercliid !== undefined &&
                        el.msg_sendercliid === body.msg_sendercliid) {
                        Object.defineProperty(el, 'msg_fromyou',
                            Object.getOwnPropertyDescriptor(el, 'msg_sendercliid'));
                        delete el['msg_sendercliid'];
                        delete el['msg_sendervolid'];
                        el.msg_fromyou = true;
                    } else {
                        if (el.msg_sendervolid != null && body.msg_sendervolid !== undefined &&
                            el.msg_sendervolid === body.msg_sendervolid) {
                            Object.defineProperty(el, 'msg_fromyou',
                                Object.getOwnPropertyDescriptor(el, 'msg_sendervolid'));
                            delete el['msg_sendercliid'];
                            delete el['msg_sendervolid'];
                            el.msg_fromyou = true;
                        }
                        else {
                            delete el['msg_sendercliid'];
                            delete el['msg_sendervolid'];
                            el.msg_fromyou = false;
                        }
                    }
                    result['application/json'] = {
                        "last_msg": el,
                        "status": "OK"
                    };
                }
            })
            .catch((err) => {
                console.error(TAG + " -> result: " + err);
                result['application/json'] = {
                    "last_msg": null,
                    "status": "ERROR"
                };
                if (err.message === "Not Found Dialog") {
                    result['application/json'] = {
                        "last_msg": null,
                        "status": "NOT FOUND"
                    };
                }
                if (err.message === "No Access") {
                    result['application/json'] = {
                        "last_msg": null,
                        "status": "NO ACCESS"
                    };
                }
            })
            .finally(() => {
                resolve(result[Object.keys(result)[0]]);
            });
    });
};


/**
 * Отправить сообщение
 *
 * body Body ID диалога, ID отправителя и текст сообщения
 * returns inline_response_200
 **/

exports.sendMsg = function (body) {
    const TAG = "sendMsg";

    // Создание записи посещения для хранения в БД
    const this_msg =
        {
            msg_text: body.msg_text,
            msg_sendercliid: body.msg_sendercliid,
            msg_sendervolid: body.msg_sendervolid,
            msg_dt: new Date()
        };

    return new Promise(function (resolve, reject) {
            const result = {};
            result['application/json'] = {
                "msg_id": null,
                "status": "SERVER ERROR"
            };

            try {
                MethodDB.selectDialog(knex, body.dlg_id)
                    .then((res) => {
                        if (res.length === 0) throw new Error("Not Found Dialog");
                        if ((res[0].cli_id === body.msg_sendercliid && body.msg_sendervolid === undefined) ||
                            ((res[0].vol1_id === body.msg_sendervolid || res[0].vol2_id === body.msg_sendervolid) &&
                                body.msg_sendercliid === undefined))
                            return {set_vol1: false};
                        else {
                            if (res[0].vol1_id === null && body.msg_sendervolid !== undefined
                                && body.msg_sendercliid === undefined)
                                return {set_vol1: true};
                            else throw new Error('No Access');
                        }
                    })
                    .then((res) => {
                        if (res.set_vol1)
                            return knex('dialog').update('vol1_id', body.msg_sendervolid).where('dlg_id', body.dlg_id);
                    })
                    .then((res) => {
                        if (res != null && res.length === 0) throw new Error("Could not bind message to dialog");
                        return MethodDB.insertMessage(knex, this_msg);
                    })
                    .then((res) => {
                        return MethodDB.insertDlgMsg(knex, {msg_id: res[0], dlg_id: body.dlg_id})
                    })
                    .then((res) => {
                        console.log(TAG + " -> result: good");
                        result['application/json'] = {
                            "msg_id": res[0],
                            "status": "OK"
                        };
                    })
                    .catch((err) => {
                        console.error(TAG + " -> result: " + err);
                        result['application/json'] = {
                            "msg_id": null,
                            "status": "ERROR"
                        };
                        if (err.message === "Not Found Dialog") {
                            result['application/json'] = {
                                "msg_id": null,
                                "status": "NOT FOUND"
                            };
                        }
                        if (err.message === "No Access") {
                            result['application/json'] = {
                                "msg_id": null,
                                "status": "NO ACCESS"
                            };
                        }
                    })
                    .finally(() => {
                        resolve(result[Object.keys(result)[0]]);
                    });
            }
            catch
                (err) {
                result['application/json'] = {
                    "msg_id": null,
                    "status": "SERVER ERROR"
                };
                console.error(TAG + " -> result: " + err);
                reject(result[Object.keys(result)[0]]);
            }

        }
    );
};