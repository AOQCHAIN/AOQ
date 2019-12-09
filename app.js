const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const jwt = require('koa-jwt')
const koaStatic = require('koa-static')
const https = require('https')
const fs = require('fs')
const path = require('path')

const {ERROR_TYPE} = require('./constans')
const router = require('./router')
const sequelize = require('./model/mongodb/sequelize')

app
    .use((ctx, next) => {
        return next().catch(err => {
            if (err.status === 401) {
                ctx.status = 200
                ctx.body = {
                    error_code: ERROR_TYPE.AUTH_FAILED.code,
                    error_message: ERROR_TYPE.AUTH_FAILED.message
                }
            } else {
                throw err
            }
        })
    })
    // 跨域
    .use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', ctx.header.origin)
        ctx.set('Access-Control-Allow-Credentials', true)
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        ctx.set('Access-Control-Allow-Headers', 'X-Real-IP, Content-Type, Authorization')

        await next()
    })
    .use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 500 * 1024 * 1024
        }
    }))
    .use(koaStatic(path.join(__dirname, 'public')))
    .use(router.routes())
    .use(router.allowedMethods())

const server = require('http').createServer(app.callback())
server.listen(80, '0.0.0.0');



