'use strict';

module.exports.gfZipCodeSearch = (event, context, callback) => {

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'simple serverless.',
      input: event,
    }),
  };

  callback(null, response);
};
