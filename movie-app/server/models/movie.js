const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
   id: { type: Number, required: true },
   title: { type: String, required: true },
   rating: { type: String},
   imgurl: {type: String, required: true},
   score: {type: String},
   review: {type: String ,required: true}
});

module.exports = mongoose.model('Movie', movieSchema);