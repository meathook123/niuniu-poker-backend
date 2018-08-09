var restify = require('restify');

function respond(req, res, next) {
  res.send('hello world');
  next();
}

function test(req, res, next) {
  res.send('test');
  next();
}

var server = restify.createServer({
  name: 'niuniu-poker-backend',
  url: 'localhost'
});
server.get('/', respond);
server.get('/test', test);

server.listen(8080, '127.0.0.1', function() {
  console.log('%s listening at %s', server.name, server.url);
});
