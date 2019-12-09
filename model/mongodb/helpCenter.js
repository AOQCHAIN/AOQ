'use strict'
let mongoose = require('./db');

const helpCenter = mongoose.Schema({
    author: String,
    language: Number,
    question: String,
    type: Number,
    answer: String,
    published: Boolean,
    date: {type: Date, default: Date.now}
})

const helpCenterModel = mongoose.model('helpcenter', helpCenter);

module.exports = helpCenterModel
