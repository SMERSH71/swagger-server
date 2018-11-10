'use strict';

exports.selectRequest = function (knex) {
    let all_rqt = null;
    return knex.select().from(function () {
        all_rqt = this.select().from('request').where('rqt_status', 0).as('all_rqt')
    })
        .where('rqt_dt', function () {
            this.min('rqt_dt').from(all_rqt)
        });
};

exports.insertVolInRqt = function (knex, vol_id, rqt_id) {
    return knex('request').update({vol_id: vol_id, rqt_status: 1}).where('rqt_id', rqt_id);
};

exports.selecClientInfo = function (knex, cli_id) {
   return knex.select('cli_fullname','cli_email','cli_phone','cli_address','cli_passeries','cli_pasnumber',
       'cli_pasissued','cli_pasdateissued','cli_pasdeviscode').from('client').where('cli_id', cli_id);
};