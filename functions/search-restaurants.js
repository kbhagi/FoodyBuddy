'use-strict';

const AWS = require('aws-sdk');
const co = require('co');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

function* findRestaurantsByTheme(theme, count) {
  let req = {
    TableName: tableName,
    Limit: count,
    FilterExpression: "contains(themes, :theme)",
    ExpressionAttributeValues: { ":theme": theme }
  };

  let  resp = yield dynamodb.scan(req).promise();
  return resp.Items;
};

module.exports.handler = co.wrap(function* (event, context, cb) {
  let req = JSON.parse(event.body);
  console.log(req.theme)
  let restaurants = yield findRestaurantsByTheme(req.theme, defaultResults);
  console.log(restaurants)
  let response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  }

  cb(null,response);
});