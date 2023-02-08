const{DataTypes}=require("sequelize")
const database = require("../database")
const persona=require("./model_persona")

const instructor=database.define("instructor",{
    idinstructor:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    observacion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    idpersona: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName:"Instructor",
    timestamps:false
})

instructor.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona"
})

module.exports=instructor