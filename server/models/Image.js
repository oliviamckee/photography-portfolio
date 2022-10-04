const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const imageSchema = new Schema(
    {
        alt: {
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
        description: {
            type: String,
            required: false
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
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
