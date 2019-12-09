'use strict'
const mongoose =require('mongoose');
const Config=require('../../config');

const dbUrl=`mongodb://${Config.mongo.host}:${Config.mongo.port}/${Config.mongo.dbName}`;
mongoose.connect(dbUrl);

module.exports=mongoose;
