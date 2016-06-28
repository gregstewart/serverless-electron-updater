export default (event, context, cb) => {
  if (event && event.platform) {
    return cb(null, {
      message: `Go Serverless! Your Lambda function executed successfully with ${event.platform}!`
    });
  }
  return cb(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
  });
};
