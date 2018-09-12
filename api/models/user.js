const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    email: { 
        type: String, 
        required: true,
        trim: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    password: { type: String, trim: true, required: true }
});

module.exports = mongoose.model('User', userSchema);