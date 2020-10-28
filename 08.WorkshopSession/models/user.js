const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const saltRounds = config.saltRounds;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        //minlength: 3
    }
});

//проверяваме дали изпратената парола отговаря на текущата
userSchema.methods.comparePasswords = function (providedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(providedPassword, this.password, function (err, result) {
            if (err) { reject (err); return; }
            resolve(result); //ще върне true/false
        });
    });
};

userSchema.pre('save', function (done) { //hook - правим нещо, преди да запазим потребителя
    const user = this;
    //при съществуващ потребител
    if (!user.isModified('password')) {
        done();
        return;
    }
    //при нов потребител или променена парола
    bcrypt.genSalt(saltRounds, (err, salt) => { //да е arrow ф-ция, за да не губим контекста
        if (err) { done(err); return; }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { done(err); return; }
            user.password = hash;
            done();
        });
    });
});

module.exports = new mongoose.model('user', userSchema);