'use strict';

export default (event, context, cb) => {
  return cb(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
  });
};
