'use strict';
const MethodDB = require('../db_method/MethodVolunteer');
const knex = require('../index').knex;

/**
 * Получить необработанную заявку
 *
 * returns inline_response_200_13
 **/
exports.getRequest = function (body) {
    const TAG = "getRequest";

    return new Promise(function (resolve, reject) {
        const result = {};
        result['application/json'] = {
            "request_data": null,
            "status": "SERVER ERROR"
        };

        let data = {
            rqt_id: null,
            client: null,
            dlg_id: null,
            rqt_url: null,
            rqt_comment: null,
            rqt_imgsource: null,
            rqt_dt: null
        };

        MethodDB.selectRequest(knex)
            .then((res) => {
                if (res.length === 0) throw new Error("Not Found Request");
                data.rqt_id = res[0].rqt_id;
                data.dlg_id = res[0].dlg_id;
                data.rqt_url = res[0].rqt_url;
                data.rqt_comment = res[0].rqt_comment;
                data.rqt_imgsource = res[0].rqt_imgsource;
                data.rqt_dt = res[0].rqt_dt;
                return MethodDB.selecClientInfo(knex, res[0].cli_id);
            })
            .then((res) => {
                if (res.length === 0) throw new Error('Not Found Client');
                data.client = res[0];
                return MethodDB.insertVolInRqt(knex,body.vol_id,data.rqt_id);
            })
            .then((res) => {
                if (res.length === 0) throw new Error('Invalid Update');
                console.log(TAG + " -> result: good");
                result['application/json'] = {
                    "request_data": {
                        "client": data.client,
                        "dlg_id": data.dlg_id,
                        "rqt_url": data.rqt_url,
                        "rqt_imgsource": data.rqt_imgsource,
                        "rqt_comment": data.rqt_comment,
                        "rqt_dt": data.rqt_dt
                    },
                    "status": "OK"
                };
            })
            .catch((err) => {
                console.error(TAG + " -> result: " + err);
                result['application/json'] = {
                    "request_data": null,
                    "status": "ERROR"
                };
                if(err.message === "Not Found Client"){
                    result['application/json'] = {
                        "request_data": null,
                        "status": "NOT FOUND CLI"
                    };
                }
                if(err.message === "Invalid Update"){
                    result['application/json'] = {
                        "request_data": null,
                        "status": "INVALID UPD RQT"
                    };
                }
            })
            .finally(() => {
                resolve(result[Object.keys(result)[0]]);
            });
    });
};

