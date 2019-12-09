'use strict'
const mongoose = require('mongoose');
const Config=require('../config');
const chalk=require('chalk');

const dbUrl=`mongodb://${Config.mongo.host}:${Config.mongo.port}/${Config.mongo.dbName}`;

function initMongo() {
    mongoose.connect(dbUrl,error=>{
        if(error){
            console.log(chalk.red('mongo连接失败'),error);
        }else{
            console.log(chalk.green('mongo连接成功'))
        }

    });

    mongoose.connection.on('connect',function () {
        console.log("事件：mongodb连接成功");
    });

    mongoose.connection.on('error',(error)=>{
        console.log("事件：mongodb连接失败，："+error);
    });

    mongoose.connection.on('disconnect',function () {
        console.log("事件：mongodb连接断开");
    })

    return mongoose.connection;

}

module.exports=initMongo


