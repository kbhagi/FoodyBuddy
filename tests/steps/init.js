'use strict';

const co = require('co');
const Promise = require('bluebird');

let initialized = false;

let init = co.wrap(function* () {
    if (initialized){
    return;      
    }
    process.env.restaurants_api="https://b51c8omkbk.execute-api.us-east-1.amazonaws.com/dev/restaurants";
    process.env.restaurants_table = "restaurants";
    process.env.AWS_REGION = "us-east-1";
    process.env.cognito_client_id = "2jhesmdrg00l4i7daju2cd3tlo";
    process.env.cognito_user_pool_id = "us-east-1_sUjOua9P9";
    process.env.cognito_server_client_id = "58use83rkd0894tvdct9ulugq5"

    console.log("AWS credentials loaded");
    initialized=true;
});

module.exports.init = init;