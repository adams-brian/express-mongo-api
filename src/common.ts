import { MongoClient } from 'mongodb';

export const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
    if (err)  { return console.log(err); }
    closure(db);
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
