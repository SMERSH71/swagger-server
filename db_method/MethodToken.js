'use strict';

exports.setToken = function (knex, data, token) {
    return knex('volunteer').update('vol_token', token)
    .where({vol_email: data.vol_email, vol_hashpass: data.vol_hashpass});    
};

exports.checkToken = function (knex, token) {
    return knex.select().from('volunteer').where('vol_token', token);
}
