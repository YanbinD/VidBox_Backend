const mongoose = require('mongoose')
const { Schema } = Mongoose;

const genreSchema = new Schema ({
    name : {
        type : String, 
        required : true, 
        minlength : 5,
        maxlength : 50
    }
}); 

// load the schema into mongoose 
mongoose.model('Genre', genreSchema);