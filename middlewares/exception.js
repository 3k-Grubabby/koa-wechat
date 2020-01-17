const {HttpException} =  require("../core/http-exception.js")


const catchError = async (ctx,next)=>{
    try {
        await next()
    } catch (error) {

        //开发环境
        //生成环境

        const isHttpException  = error instanceof HttpException
        const isDev = global.config.environment == 'dev'
        if(isDev&& !isHttpException ){
            throw error
        }
        //已知异常
        if(isHttpException){
            ctx.body = {
                msg:error.msg,
                error_code:error.errorCode,
                request:`${ctx.method} ${ctx.path}`

            }
            ctx.status = error.code
        }else{
            ctx.body = {
                msg:'未知错误',
                error_code:999,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
        /**
         * message
         * error_code 详细,开发者自定义 10001 10002
         * request_url 请求url
         * 
         * 
         * ----------------------------------------
         * 已知错误
         * 未知错误
         */
    }
} 

module.exports = catchError

