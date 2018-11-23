const AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB()

const epsagon = require('epsagon');

epsagon.init({
    token: 'b91d1948-2200-4eb6-91ef-b4704024c055',
    appName: 'toby-nuatu-demo',
    metadataOnly: false,
});

// And wrap your lambda entry point (hello for example) as in this example:
module.exports.hello = epsagon.lambdaWrapper(async message => {
   
  console.log(message);
  let userId = message.pathParameters.id
  let params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: { S: userId }
    }
  };

  console.log(`Getting user ${userId} from table ${process.env.TABLE_NAME}`);
  let results = await dynamodb.getItem(params).promise()
  console.log(`Done: ${JSON.stringify(results)}`);

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(results.Item)
  };
});

