var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        authSource: 'admin'
    },
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS
})
    .then(() => console.log('Connection to MongoDB successfully established.'))
    .catch(err => console.error(err));

var db = mongoose.connection;

module.exports = db;
