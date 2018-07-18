import { Db, MongoClient } from 'mongodb';

export const connection = (closure: (db: Db) => void) => {
  return MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err)  { return console.log(err); }
    closure(client.db('express-mongo-api'));
  });
};

export const createSuccess = (data) => {
  return {
    status: 200,
    data: data,
    message: null
  };
};

export const createError = (err) => {
  return {
    status: 501,
    data: null,
    message: typeof err === 'object' ? err.message : err
  };
};
