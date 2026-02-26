const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {default : passportLocalMongoose} = require('passport-local-mongoose');

const userSchema = new Schema({
    email :{
        type : String,
        required : true,
        index : true,
        unique : true,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;