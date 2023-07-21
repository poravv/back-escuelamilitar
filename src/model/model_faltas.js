const{DataTypes}=require("sequelize")
const database = require("../database")
const persona=require("./model_persona")
const aptitud_militar=require("./model_aptitud_militar")

const faltas=database.define("faltas",{
    idfaltas:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
    observacion:{
        type: DataTypes.STRING,
        allowNull:false
    },
    idinscripcion: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idpersona: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idaptitud_militar: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    estado:{
        type: DataTypes.STRING,
        allowNull:false
    },
},{
    tableName:"faltas",
    timestamps:false
})

faltas.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona",
    sourceKey:"idpersona"
})
faltas.hasOne(aptitud_militar,{
    foreignKey:"idaptitud_militar",
    primaryKey:"idaptitud_militar",
    sourceKey:"idaptitud_militar"
})
module.exports=faltas