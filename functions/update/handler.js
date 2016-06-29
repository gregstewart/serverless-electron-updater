export default (event, context, cb) => {
  if (event && event.platform && event.version) {
    return cb(null, {
      message: `Go Serverless! Your Lambda function executed successfully with platform: ${event.platform} and version: ${event.version}!`
    });
  }
  return cb(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
  });
};
