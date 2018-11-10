'use strict';

exports.insertMessage = function (knex, msg) {
    return knex('message').insert(msg).returning('msg_id');
};

exports.insertDlgMsg = function (knex, data) {
    return knex('dlg_msg').insert(data).returning('msg_id');
};

exports.selectDialogMsgs = function (knex, dlg_id) {
    return knex.select().from('message').where('msg_id', 'in', function () {
        this.column('msg_id').select().from('dlg_msg').where('dlg_id', dlg_id)
    });
};

exports.selectDialog = function (knex, dlg_id) {
    return knex.select().from('dialog').where('dlg_id', dlg_id);
};

exports.selectDialogLastMsg = function (knex, dlg_id) {
    let all_msgs = null;
    return knex.select().from(function () {
        all_msgs = this.select().from('message').where('msg_id', 'in', function () {
            this.column('msg_id').select().from('dlg_msg').where('dlg_id', dlg_id)
        }).as('all_msgs') // Все сообщения данного диалога
    }).where('msg_dt', function () {
        this.max('msg_dt').from(all_msgs)
    });
};

exports.selectClientInfo = function (knex, cli_id) {
    return knex.select('cli_fullname').from('client').where('cli_id', cli_id);
};

exports.selectVolInfo = function (knex, vol_id) {
    return knex.select('vol_fullname', 'vol_admin').from('volunteer').where('vol_id', vol_id);
};