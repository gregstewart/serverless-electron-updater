import { darwin } from './darwin';

export default (event, context) => {
  // TODO: add feature and tests for all error paths
  if (event && event.platform && event.version) {
    if (event.platform === 'darwin') {
      return darwin(event.version).then((result) => {
        return context.done(null, result);
      });
    }
  }

  const error = {
    code: "NoContent",
    message: "Nothing to see here"
  };
  return context.fail(error);
};
