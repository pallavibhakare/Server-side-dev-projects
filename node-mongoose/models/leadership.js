/* Pallavi Bhakare 2/22/2017*/
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
	image: {
        type: String,
        required: true
    },
	designation: {
        type: String,
        required: true
    },
	abbr: {
        type: String,
		drequired: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Leadership = mongoose.model('leadership', leaderSchema);


// make this available to our Node applications
module.exports = Leadership;