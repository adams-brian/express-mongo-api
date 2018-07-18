import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import usersRouter from './routes/users';
import countersRouter from './routes/counters';

const port = process.env.PORT || '4000';

const server = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4200"
];
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(function (req, res, next) {
  const origin = req.get('origin');
  if (allowedOrigins.indexOf(origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

const router = express.Router();
router.use('/users', usersRouter);
router.use('/counters', countersRouter);
router.use('*', (req, res) => {
  res.send('<h1>The API</h1>');
});
server.use('/', router);

http.createServer(server).listen(port, () => console.log(`Running on localhost:${port}`));
