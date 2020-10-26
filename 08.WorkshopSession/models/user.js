const mongoose = require('mongoose');
const bcrypt = reqire('bcrypt');
const saltRounds = 10;

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
userSchema.methods.matchPassword = function (providedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(providedPassword, this.password, function (err, result) {
            if (err) { reject (err); return; }
            resolve(result); //ще върне true/false
        });
    });
};

//при нов потребител или променена парола
userSchema.pre('save', function (done) { //hook - правим нещо, преди да запазим потребителя
    if (this.isNew || this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => { //да е arrow ф-ция, за да не губим контекста
            if (err) { done(err); return; }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { done(err); return; }
                this.password = hash;
                done();
            });
        });
    };
//при съществуващ потребител
    done();
});

module.exports = new mongoose.model('cube', userSchema);