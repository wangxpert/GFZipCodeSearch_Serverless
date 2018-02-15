'use strict';

var Promise = require('promise');
var Mssql = require("mssql");

const config = {
  user: "lambda",
  password: "10GreatFlorida10",
  server: "aws.greatflorida.com",
  database: "GreatFlorida",
  options: {
      encrypt: true // Use this if you're on Windows Azure
  }
}

module.exports.gfZipCodeSearch = (event, context, callback) => {
  console.log("GFZipCodeSearch Started...");
  Mssql.connect(config).then( pool => {
    console.log("sql server connected.");

    return pool.request().execute('lambda_GetAllAgents');
  }).then(result => {
    console.log(result);

    const response = {
      statusCode: 200,
      result: result
    };
    callback(null, response);
  }).catch(err => {
    callback(null, {
      statusCode: 500,
      error: err
    });
  });

  Mssql.on('error', err => {
    console.log("connection failed.");
    callback(null, {
      statusCode: 500,
      error: err
    }); 
  });
};

// testing stage
if (require.main === module) {
  // const event = {
  //   "Details": {
  //       "ContactData": {
  //           "Attributes": {},
  //           "Channel": "VOICE",
  //           "ContactId": "c24a33e3-fa7e-4d9e-a5cd-ea793a084df9",
  //           "CustomerEndpoint": {
  //               "Address": "+15595158434",
  //               "Type": "TELEPHONE_NUMBER"
  //           },
  //           "InitialContactId": "c24a33e3-fa7e-4d9e-a5cd-ea793a084df9",
  //           "InitiationMethod": "INBOUND",
  //           "InstanceARN": "arn:aws:connect:us-east-1:467277825558:instance/b4b9a78e-3d32-4f95-b6e3-73d0e1349e6d",
  //           "PreviousContactId": "c24a33e3-fa7e-4d9e-a5cd-ea793a084df9",
  //           "Queue": null,
  //           "SystemEndpoint": {
  //               "Address": "+18445564675",
  //               "Type": "TELEPHONE_NUMBER"
  //           }
  //       },
  //       "Parameters": {}
  //   },
  //   "Name": "ContactFlowEvent"
  // };
  const event = {
    param1: "1"
  };

  module.exports.gfZipCodeSearch(event, {}, console.log);
}