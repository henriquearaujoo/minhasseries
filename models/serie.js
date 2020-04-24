const mongoose = require('mongoose');

const SerieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enumVales: ['to-watch', 'watching', 'watched']
    },
    coments: [String]
})

const Serie = mongoose.model('Serie', SerieSchema);

module.exports = Serie;