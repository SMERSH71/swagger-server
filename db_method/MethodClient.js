'use strict';

exports.insertClient = function (knex, client) {
    return knex('client').insert(client).returning('cli_id');
};

exports.insertRequest = function (knex, request) {
    return knex('request').insert(request).returning('rqt_id');
};

exports.insertDialog = function (knex, dialog) {
    return knex('dialog').insert(dialog).returning('dlg_id');
};

// Обновить id диалога заявки с заданным id клиента
exports.updRequestDlg = function (knex, dlg_id, rqt_id, cli_id) {
    return knex('request').update('dlg_id', dlg_id)
        .where({rqt_id: rqt_id, dlg_id: null, cli_id: cli_id}).returning('dlg_id');
};