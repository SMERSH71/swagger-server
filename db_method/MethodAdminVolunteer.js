'use strict';

exports.accessCheck = function (knex, data) {
    return knex.select('vol_id', 'vol_fullname', 'vol_admin').from('volunteer')
        .where({vol_email: data.vol_email, vol_hashpass: data.vol_hashpass});
};

exports.setToken = function (knex, data, token) {
    knex('volunteer').update({vol_token: token})
    .where({vol_email: data.vol_email, vol_hashpass: data.vol_hashpass});    
}