/**
 * Created by ivano on 10.11.2016 г..
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('./../models/Role').initialize();
require('./../models/User').seedAdmin();
require('./../models/User');
require('./../models/Article');
require('./../models/Category');
require('./../models/Tag');

module.exports = (config) => {
    mongoose.connect(config.connectionString);

    let database = mongoose.connection;
    database.once('open', (error) => {
        if(error) {
            console.log(error);
            return;
        }

        console.log('MongoDB ready!')
    });

    require('./../models/User');
};

let userSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        passwordHash: {type: String, required: true},
        fullName: {type: String, required: true},
        articles: {type: [mongoose.Schema.Types.ObjectId], default: []},
        salt: {type: String, required: true}
    }
);