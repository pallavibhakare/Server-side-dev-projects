// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


// create a schema
var favoriteSchema = new Schema({
	
  
    postedBy: {
		type: Schema.Types.ObjectId,
        ref: 'User'
    },
   	dishes : [{
			
		type: Schema.Types.ObjectId,
        ref: 'Dish'
	}]
},{
	timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Favorites  = mongoose.model('favorite', favoriteSchema);


// make this available to our Node applications
module.exports = Favorites;