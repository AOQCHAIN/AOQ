'use strict'

let redisHelper = require('../../utils/redisHelper');
let Config = require('../../config');

redisHelper.hexists(`${Config.dapp.trx.redisPrefix.dappManage}中文`,'中文field').then(data=>{
    console.log(data)
})


