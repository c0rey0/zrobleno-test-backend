require('../../shared/env')();
const koaBody = require('koa-bodyparser');
const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');
const cors = require('@koa/cors');

// require('../../shared/db');

const app = new Koa();
app.use(cors());
app.use(koaBody());

app.use(require('./exception.handler'));
app.use(require('./routes/test.api'));





if (process.env.NODE_ENV === 'development') {
  app.use(mount('/docs', serve(path.join(process.cwd(), '/public/static/docs'), { defer: true })));
}

if (!module.parent) {
  app.listen(process.env.PORT_API, () => process.stdout.write(`Server listening on ${process.env.PORT_API}\n`));
}

module.exports = app;
