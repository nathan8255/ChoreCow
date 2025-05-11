const { Schema, model } = require('mongoose');

let children = new Schema({
    _id: String,
    name: String,
    complete: Boolean
});

module.exports = model('children', children);