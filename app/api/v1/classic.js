const Router =require("koa-router")
const {PositiveIntegerValidator}  = require("../../validators/validator.js")
const {Auth}  = require('../../../middlewares/auth')

const {Movie,Sentence,Music} = require("../../models/classic")
const {Flow} = require("../../models/flow")
const {Art} = require("../../models/art")

const router = new Router({
    prefix:"/v1/classic"  
})
router.get('/latest',new Auth().m ,async (ctx,next)=>{
  
    const flow = await  Flow.findOne({
        order:[
            ['index','DESC']
        ]
    })
    const art = await  Art.getData(flow.art_id,flow.type)
    art.index  = flow.index
    ctx.body = art   

})

module.exports= router