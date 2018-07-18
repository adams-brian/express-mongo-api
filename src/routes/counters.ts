import {Router, Request, Response, NextFunction} from 'express';
import {connection, createSuccess, createError} from '../common';
import { Db } from 'mongodb';

const get = (req: Request, res: Response) => {
  setTimeout(() => {
    connection((db) => {
      db.collection('counters')
        .findOne({})
        .then((counters) => {
          res.json(createSuccess(counters === null ? [] : counters.counters));
        })
        .catch((err) => {
          res.status(501).json(createError(err));
        });
      });
  }, 1000);
};

const post = (req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => {
    connection((db) => {
      db.collection('counters')
        .replaceOne({}, req.body, { upsert: true })
        .then((result) => {
          res.json({status: 200, data: null, message: null})
        })
        .catch((err) => {
          res.status(501).json(createError(err));
        });
    });
  }, 1000);
};

const router = Router();
router.get('', get);
router.post('', post);

export default router;
