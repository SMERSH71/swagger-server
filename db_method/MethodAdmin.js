'use strict';

exports.insertVol = function (knex, vol) {
    return knex('volunteer').insert(vol).returning(['vol_id', 'vol_fullname', 'vol_admin']);
};