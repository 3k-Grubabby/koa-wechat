const util = require('util')
const axios = require('axios')
const {User}  =require("../models/user")
const {generateToken}  = require('../../core/util')
const {Auth} = require('../../middlewares/auth')
class WXManager {
    static async codeToToken(code){
        // code  小程序生成
        //openid 唯一标识
        // code appid appsecret

        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)
        const result = await axios.get(url)
        if(result.status !== 200){
            throw new global.errs.AuthFailed('oppenID获取失败')
        }
        const errCode = result.data.errCode 
        const errMsg = result.data.errMsg 
        if(errCode){
            throw new global.errs.AuthFailed('oppenID获取失败:'+errMsg)
        }
        
        //openid 
        let user = await User.getUserByOpendid(result.data.openid)
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
        }
        return await  generateToken(user.id,Auth.USER)
    }
}
module.exports = {
    WXManager
}