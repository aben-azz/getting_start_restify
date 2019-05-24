const restify = require('restify'),
      restify_err = require('restify-errors'),
      port = process.env.port || 8080,
      server = restify.createServer({
        name: "api server"
      });

server.use(restify.plugins.queryParser());
let geter = (req, res, next) => {
  if (!req.query.name)
    return next(new restify_err.NotFoundError("Name not found"));
  let obj = {
    query: req.query,
    command: req.params.name
  };
  next(res.send(200, obj));
}

let pre = (req, res, next) => {
  next(console.log("Method %s - URL %s",  req.method, req.url));
}

server.get('/api/:name', geter);
server.pre(pre);
server.listen(port, () => console.log('%s listening at %d', server.name, port));
