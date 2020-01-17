const Koa = require("koa")
const InitManager = require("./core/init.js")
const parser = require("koa-bodyparser")
const catchError = require('./middlewares/exception.js')


const app = new Koa()
app.use(catchError)
app.use(parser())
InitManager.initCore(app)



//应用程序对象
app.listen(3000)