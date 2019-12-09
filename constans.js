const ERROR_TYPE = {
    REQUEST_SUCCESS: {
        code: 0,
        message: "请求成功"
    },
    AUTH_FAILED: {
        code: 10000,
        message: '校验失败'
    },
    PARAMS_ERROR: {
        code: 10001,
        message: "参数错误"
    },
    ADDRESS_ERROR: {
        code: 10002,
        message: "地址校验出错"
    },
    REJECTED_ERROR:{
        code: 20001,
        message: "内部REJECT错误"
    }

}

module.exports = {
    ERROR_TYPE
}
