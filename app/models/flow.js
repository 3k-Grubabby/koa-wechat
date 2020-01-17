const {sequelize} = require("../../core/db.js")
const {Sequelize,Model} = require("sequelize")


class Flow extends Model{

}

Flow.init({
    index:Sequelize.INTEGER, //期刊序号
    art_id:Sequelize.INTEGER, //实体id
    type:Sequelize.INTEGER // 100 Movie 200 Music 300 Sentence
},{
    sequelize,
    tableName:"flow"
})

module.exports={
    Flow
}