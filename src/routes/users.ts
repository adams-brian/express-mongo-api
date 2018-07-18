import {Router, Request, Response, NextFunction} from 'express';
import {connection, createSuccess, createError} from '../common';
import { omit } from 'lodash';

const list = (req: Request, res: Response, next: NextFunction) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        res.json(createSuccess(users));
      })
      .catch((err) => {
        res.status(501).json(createError(err));
      });
  });
};

const get = (req: Request, res: Response) => {
  connection((db) => {
    db.collection('users')
      .findOne({'_id': req.params.id})
      .then((user) => {
        res.json(createSuccess(user));
      })
      .catch((err) => {
        res.status(501).json(createError(err));
      });
  });
};

const create = (req: Request, res: Response, next: NextFunction) => {
  connection((db) => {
    db.collection('users')
      .insertOne(req.body)
      .then((result) => {
        res.json(createSuccess(result))
      })
      .catch((err) => {
        res.status(501).json(createError(err));
      });
  });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  connection((db) => {
    db.collection('users')
      .updateOne(
        {'_id': req.params.id},
        { $set: omit(req.body, '_id') }
      )
      .then((result) => {
        res.json(createSuccess(result))
      })
      .catch((err) => {
        res.status(501).json(createError(err));
      });
  });
};

const del = (req: Request, res: Response) => {
  connection((db) => {
    db.collection('users')
      .remove({'_id': req.params.id})
      .then((result) => {
        res.json(createSuccess(result))
      })
      .catch((err) => {
        res.status(501).json(createError(err));
      });
  });
};

const router = Router();
router.get('', list);
router.get('/:id', get);
router.put('', create);
router.post('/:id', update);
router.delete('/:id', del);

export default router;
