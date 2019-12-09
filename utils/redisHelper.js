let redis = require('async-redis')
const config = require('../config')

let client

const getConn = function () {
    if (!client) {
        client = redis.createClient({
            'host': config.redis.host,
            'port': config.redis.port,
            retry_strategy: _retry,
            db: "2"
        })
        client.auth(config.redis.password)
        client.on('error', err => {
            console.log('error event - ' + redis.host + ':' + redis.port + ' - ' + err)
        })
    }
    return client
}

const set = async (key, value, time) => {
    if (!key || !value) {
        return
    }
    await getConn().set(key, value)
    if (time && time > 0) {
        getConn().expire(key, time)
    }
}

const get = async key => {
    if (!key) {
        return ''
    }
    let result = await getConn().get(key)
    return result
}

const del = async key => {
    if (!key) {
        return ''
    }
    let result = await getConn().del(key)
    return result
}

const incrby = async (key, num) => {
    if (!key || typeof num !== 'number') {
        return null
    }
    let result = await getConn().incrby(key, num)
    return result
}

const decrby = async (key, num) => {
    if (!key || typeof num !== 'number') {
        return null
    }
    let result = await getConn().decrby(key, num)
    return result
}

const zadd = async (argArray) => {
    if (!argArray.length % 2) {
        return null
    }
    let result = await getConn().zadd(argArray);
    return result;
}

const zcard = async (key) => {
    if (!key) {
        return null
    }
    let result = await getConn().zcard(key);
    return result;
}

const zincrby = async (key, increment, member) => {
    if (!key || !increment || !member) {
        return null
    }
    let result = await getConn().zincrby(key, increment, member);
    return result;
}

const zcount = async (key, min, max) => {
    if (!key || !min || !max) {
        return null
    }
    let result = await getConn().zcount(key, min, max);
    return result;
}

async function zrange(key, start, stop, withScore) {
    if (!key || !start || !stop) {
        return null
    }
    let result;
    if (withScore) {
        result = await getConn().zrange(key, start, stop, "WITHSCORES");

    } else {
        result = await getConn().zrange(key, start, stop);
    }
    return result;
}

async function zrangebyscore(key, min, max, withScore/*必传参数*/, limit, offset, count) {
    if (!key || !min || !max) {
        return null
    }

    let result;
    if (withScore) {
        if (limit) {
            result = await getConn().zrangebyscore(key, min, max, 'WITHSCORES', "LIMIT", offset, count)
        } else {
            result = await getConn().zrangebyscore(key, min, max, 'WITHSCORES');
        }
    } else {
        if (limit) {
            result = await getConn().zrangebyscore(key, min, max, "LIMIT", offset, count);
        } else {
            result = await getConn().zrangebyscore(key, min, max);
        }
    }

    return result;

}

async function zrem(key, member) {
    if (!key || !member) {
        return null
    }

    let result = await getConn().zrem(key, member);
    return result;
}

async function zrevrange(key, start, stop, withScore) {
    if (!key || !start || !stop) {
        return null
    }
    let result;
    if (withScore) {
        result = await getConn().zrevrange(key, start, stop, "WITHSCORES");
    } else {
        result = await getConn().zrevrange(key, start, stop);
    }
    return result;
}

function _retry(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
}

async function hset(hashName, field, value) {
    let result = await getConn().hset(hashName, field, value);
    return result;
}

async function hget(hashName, field) {
    let result = await getConn().hget(hashName, field);
    return result;
}

async function HMSET(hashName, obj) {
    let result = await getConn().HMSET(hashName, obj);
    return result;
}

async function hgetall(hashName) {
    let result = await getConn().hgetall(hashName);
    return result;
}

async function hexists(hashName,field){
    let result = await getConn().hexists(hashName,field);
    return result;
}

async function hdel(...args){

    let result = await getConn().hdel(...args);
    return result;
}

module.exports = {
    set,
    get,
    del,
    incrby,
    decrby,
    zadd,
    zcard,
    zincrby,
    zcount,
    zrange,
    zrangebyscore,
    zrem,
    zrevrange,
    hset,
    hget,
    HMSET,
    hgetall,
    hexists,
    hdel
}
