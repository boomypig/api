const mongoose = require('mongoose')

mongoose.connect(
    'mongodb+srv://bryan:Bl340233!@cluster0.6wbni05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)

const MovieSchema = new mongoose.Schema({
    movie: {
        type: String,
        require: [true,""]
    },
    length:{
        type:Number,
        required:[true,""]
    },
    description:{
        type:String,
    },
},
    {timestamps:true},
    );
const Movie = mongoose.model("Movie",MovieSchema)
module.exports = {
    Movie:Movie,
};