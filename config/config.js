module.exports={
    //dev|| prod
    environment:'dev',
    database:{
        dbName:'lin',
        host:'192.168.99.100',
        port:33060,
        user:'root',
        password:'root'
    },
    security:{
        secretKey:"abcdefj",
        expiresIn:60*60*24*30
    },
    wx:{
        appId:"wx90ac74fec62f2b9e",
        appSecret:"df84248f4f5f3e73a12600d352c417c8",
        loginUrl:"https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
    }
}