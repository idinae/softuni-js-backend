//FIRST PART
// const mongoose = require('mongoose');

// //Създаване на схема
// const userSchema = mongoose.Schema({
//     //Вар. 1
//     // name: String,
//     // age: Number,
//     // email: String

//     //Вар. 2 - с валидатори
//     name: {
//         type: String,
//         required: [true, 'Name required']
//     },
//     age: {
//         type: Number,
//         min: [10, 'Age must be gte 10'],
//         required: [true, 'Age required']
//     },
//     email: String
// });

// //Populating -> create two models that reference each other; could be based on a condition
// const userPostSchema = mongoose.Schema({
//     title: String,
//     body: String,
//     userId: { type: mongoose.Types.ObjectId, ref: 'user' }
// });

// //Създаване на виртуални пропъртита в схемата, достъпни от всички модели; имат getters и setters; трябва да са тук
// userSchema.virtual('allNames').get(function() {
//     return this.name.split(' ');
// });

// //Създаване на методи
// userSchema.methods.printAllData = function() {
//     console.log(this.name, this.age, this.email);
// }

// mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
//     console.log('Connected to database!'); 
    
//     const User = mongoose.model('user', userSchema);
//     const UserPosts = mongoose.model('userPost', userPostSchema);

//     UserPosts.create({ title: 'Post 1', body: 'Hello world', userId: '5f7f75ee42f4158e9c5a3fcb'}).then(() => console.log('Post added:'));//userId от базата
//     UserPosts.findById('5f84c0614afa340814a325a3').then(post => console.log(post));//Виждаме обекта
//     UserPosts.findById('5f84c0614afa340814a325a3').populate('userId').then(post => console.log(post));//попюлейтваме UserId с данните, които има в него


//     //Създаване на потребители / записи в базата
//     //Вар. 1
//     //const newUser = new User({ name: "Ivan", email: "ivan@abv.bg", age: 12 });
//     //newUser.save().then(() => { console.log('User was added to db') });

//     //Вар. 2
//     //User.create({ name: "Penka", email: "pena@abv.bg", age: 10 }).then(() => { console.log('Completed') });

//     //Вар. 3
//     //User.insertMany([{ name: "Irina", email: "i.d@abv.bg", age: 45 }]).then(() => { console.log('Completed') });
    
//     //Update на потребители - вар. 1
//     /*
//     User.find({name: /p/ }).then(users => { //намираме юзър с име, съдържащо 'a', използваме промис, за да го конзол-логнем
//         const updates = users.map(user => { //записваме в променлива, тъй като ще в нея ще се запишат всички промиси
//             user.name = user.name + ' ' + user.name;
//             user.save(); //с метода save() записваме в базата; връща обаче promise, все още не се записва
//         });
//         return Promise.all(updates); //тук ще обработи промисите и ще направи ъпдейт в базата
//     }).then(() => {
//         console.log('All entries have been updated!');
//     });
//     */
//    //Update - вар. 2
//    //User.update({_id: id, $set: {prop: newVal}}, callback);
//    //User.findByIdAndUpdate(id, $set: {prop: newVal}, callback);

//     //Изплозване на методи
//     // User.find({ age: { $gt: 10, $lt: 50 } }).then((data) => {
//     //     data.forEach(user => user.printAllData());
//     // });

//     User.find({ age: { $gt: 10, $lt: 50 } }).then((data) => {
//         data.forEach(user => console.log(user.allNames));
//     });


// });

//SECOND PART - не работи

global.__basedir = __dirname; //създаване на глобална променлива: взима главната директория на проекта и всички пътища са спрямо нея; отпада нуждата от resolve()
const app = require('express')();
const env = process.env.NODE_ENV || 'development';

require('./mongos/config/express')(app).then(() => {
    
    const config = require('./mongos/config/config')[env];

    require('./mongos/config/routes')(app);
    
    //глобален error handler
    app.use(function (err, req, res, next) {
        //да се обработи грешката
        if (err.message === 'BAD_REQUEST!') {
            res.status(400);
            return;
        }
    });
    
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
});