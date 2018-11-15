'use strict';

exports.accessCheck = function (knex, data) {
    return knex.select('vol_id', 'vol_fullname', 'vol_admin').from('volunteer')
        .where({vol_email: data.vol_email, vol_hashpass: data.vol_hashpass});
};

exports.insertQuote = function (knex, body) {
    return knex('quotes').insert({qot_text: body.qot_text, qot_author: body.qot_author,
        qot_textvisibility: body.qot_textvisibility, qot_imgsource: body.qot_imgsource,
        qot_countlikes: body.qot_countlikes}).returning('qot_id');
};
