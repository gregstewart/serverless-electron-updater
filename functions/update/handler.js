import { darwin } from './darwin';

export default (event, context, cb) => {
  if (event && event.platform && event.version) {
    if (event.platform === 'darwin') {
      return darwin(event.version).then((result) => {
        return cb(null, result);
      });
    }
  }
  return cb(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
  });
};
