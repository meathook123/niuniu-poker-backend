var restify = require('restify');

function respond(req, res, next) {
  res.send('hello world');
  next();
}

var server = restify.createServer({
  name: 'niuniu-poker-backend',
  url: 'localhost'
});
server.get('/', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
