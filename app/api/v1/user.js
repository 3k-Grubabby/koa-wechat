const Router =require("koa-router")
const {RegisterValidator}   =require('../../validators/validator.js')
const {User} = require("../../models/user")
const {success} = require("../../lib/helper")

const router = new Router({
    prefix:"/v1/user"
})

/**
 * 用户注册
 */

 router.post('/register',async (ctx,next)=>{
        
        //接收参数
        //参数校验
    const v = await new RegisterValidator().validate(ctx)
        //取数据
        const user = {
            email:v.get('body.email'),
            nickname:v.get('body.nickname'),
            password:v.get('body.password1')
        }
       await User.create(user)
       success()

 }) 

 module.exports= router