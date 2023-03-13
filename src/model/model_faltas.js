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
    registro:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
    ausen:{
        type: DataTypes.STRING,
        allowNull:false
    },
    descuento:{
        type: DataTypes.STRING,
        allowNull:false
    },
    idasistencia: {
        type: DataTypes.INTEGER,
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
    }
},{
    tableName:"Faltas",
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