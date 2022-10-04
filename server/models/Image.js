const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const imageSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Image = model('Image', imageSchema);

module.exports = Image;
