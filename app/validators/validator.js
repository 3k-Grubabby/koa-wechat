const {
    LinValidator,
    Rule
} = require("../../core/lin-validator.js")

const {User}  = require("../models/user")

const {loginType} = require('../lib/enum.js')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', {
                min: 1
            })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
        this.password1 = [
            new Rule('isLength', '密码最少6字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches','密码不符合规范','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ],
        this.password2 = this.password1,
        this.nickname=[
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            })
        ]
    }
    validatePassword(vals){
        const pswd1 = vals.body.password1
        const pswd2 = vals.body.password2

        if(pswd1 !== pswd2){
            throw new Error('两个密码必须相同')
        }
    }
   async validateEmail(vals){
        const email = vals.body.email
        const user = await  User.findOne({
            where:{
                email:email
            }
        })
        if(user){
            throw new Error('email 已经存在')
        }
    }
}

class TokenValidator extends LinValidator{
    constructor(){
        super()
        this.account = [
            new Rule('isLength','不符合账号规则',{min:4,max:32})
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength','不符合账号规则',{min:6,max:128})
        ]
    }

    validateLoginType(vals){
        if(!vals.body.type){
            throw new Error('type是必选参数')
        }
        if(!loginType.isThisType(vals.body.type)){
            throw new Error('type参数不合法')
        }
    }  
}

class NotEmptyValidator extends LinValidator{
        constructor(){
            super()
            this.token = [
                new Rule('isLength','不允许为空',{min:1})
            ]
        }
}



module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
}