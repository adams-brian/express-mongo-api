import {Router, Request, Response, NextFunction} from 'express';
import {ObjectId} from 'mongodb';
import {connection, createSuccess, createError} from '../common';

class CountersRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private get(req: Request, res: Response) {
    setTimeout(() => {
      connection((db) => {
        db.collection('counters')
          .findOne()
          .then((counters) => {
            res.json(createSuccess(counters.counters));
          })
          .catch((err) => {
            res.status(501).json(createError(err));
          });
        });
    }, 1000);
  }

  private post(req: Request, res: Response, next: NextFunction): void {
    setTimeout(() => {
      connection((db) => {
        db.collection('counters')
          .findOneAndUpdate({}, req.body,
          {
            upsert: true
          })
          .then((result) => {
            res.json({status: 200, data: null, message: null})
          })
          .catch((err) => {
            res.status(501).json(createError(err));
          });
      });
    }, 1000);
  }

  private init(): void {
    this.router.get('', this.get);
    this.router.post('', this.post);
  }
}

export default new CountersRouter().router;
