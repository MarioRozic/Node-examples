let express = require('express');
let app = express();

let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let book = require('./app/routes/book');
let config = require('config');

let options = { 
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
};

mongoose.connect(config.DBHost, options);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'eonnection error:'));

if(config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'appliccation/json'}));


app.get('/', (req,res) => res.json({message: 'Welcome to our Bookstore!'}));

app.route('/book')
    .get(book.getBooks)
    .post(book.postBook);

app.route('/book/:id')
    .get(book.getBook)
    .delete(book.deleteBook)
    .put(book.updateBook);


app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing