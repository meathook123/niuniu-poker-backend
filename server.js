const restify = require('restify');
const mongoose = require('mongoose');
const fs = require('fs');

// db connection
const connectStr = 'mongodb://localhost:27017/poker';
mongoose.connect(connectStr, {
  useNewUrlParser: true
});
const db = mongoose.connection;

mongoose.connection.on('opening', function() {
  console.log("reconnecting... %d", mongoose.connection.readyState);
});
db.once('open', function callback () {
  console.log("Database connection opened.");
});
db.on('error', function (err) {
  console.log("DB Connection error %s", err);
});
db.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});
db.on('disconnected', function() {
  console.log('MongoDB disconnected!');
  mongoose.connect(connectStr, {
    useNewUrlParser: true
  });
});

const controllers = {};
const controllers_path = process.cwd() + '/controllers';

fs.readdirSync(controllers_path).forEach((file) => {
  if (file.indexOf('.js') != -1) {
    controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
  }
});

const server = restify.createServer({
  name: 'niuniu-poker-backend',
  url: 'localhost'
});

server.use(restify.plugins.queryParser({
  mapParams: true
}));
server.use(restify.plugins.bodyParser({
  mapParams: true
}));

server.get('/users', controllers.user.getAllUsers);
server.post('/users/login', controllers.user.login);

server.listen(8080, '127.0.0.1', () => {
  console.log('%s listening at %s', server.name, server.url);
});
