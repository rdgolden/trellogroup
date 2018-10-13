const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, "Username required"],
        unique: [true, 'Username taken'],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password required"],
        trim: true
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
