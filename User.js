const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    address: {
        city: String,
        zipCode: { type: String, minlength: 4, maxlength: 4 }
    }
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
