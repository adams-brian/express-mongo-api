import * as express from 'express';
import * as bodyParser from 'body-parser';
import usersRouter from './routes/users';
import countersRouter from './routes/counters';

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4200"
]

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    // Add headers
    this.express.use(function (req, res, next) {
      const origin = req.get('origin');
      if (allowedOrigins.indexOf(origin) !== -1) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', origin);
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
      // Pass to next layer of middleware
      next();
    });
  }

  private routes(): void {
    let router = express.Router();
    
    router.use('/users', usersRouter);
    router.use('/counters', countersRouter);

    // Default route
    router.use('*', (req, res) => {
      res.send('<h1>The API</h1>');
    })
    
    this.express.use('/', router);
  }

}

export default new App().express;
