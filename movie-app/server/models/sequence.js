const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxMovieId: { type: Number}
});

module.exports = mongoose.model('Sequence', sequenceSchema);