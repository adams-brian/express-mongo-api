import {Router, Request, Response, NextFunction} from 'express';
import {ObjectId} from 'mongodb';
import {connection, createSuccess, createError} from '../common';

class UsersRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private list(req: Request, res: Response, next: NextFunction): void {
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
    }

    private get(req: Request, res: Response) {
        connection((db) => {
            db.collection('users')
                .find({'_id': ObjectId(req.params.id)})
                .then((user) => {
                    res.json(createSuccess(user));
                })
                .catch((err) => {
                    res.status(501).json(createError(err));
                });
        });
    }

    private create(req: Request, res: Response, next: NextFunction): void {
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
    }

    private delete(req: Request, res: Response) {
        connection((db) => {
            db.collection('users')
                .remove({'_id': ObjectId(req.params.id)})
                .then((result) => {
                    res.json(createSuccess(result))
                })
                .catch((err) => {
                    res.status(501).json(createError(err));
                });
        });
    }

    private init(): void {
        this.router.get('', this.list);
        this.router.get('/:id', this.get);
        this.router.put('', this.create);
        this.router.delete('/:id', this.delete)
    }
}

export default new UsersRouter().router;
