const DataType = require('sequelize')
const database = require('../database')
const sucursal= require('./model_sucursal')
const persona= require('./model_persona')

const usuario= database.define("usuario",{
    idusuario:{
        type: DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    usuario:{
        type:DataType.STRING,
        allowNull:false
    },
    password:{
        type:DataType.STRING,
        allowNull:false
    },
    estado:{
        type:DataType.STRING,
        allowNull:false
    },
    nivel:{
        type: DataType.INTEGER,
        allowNull:false
    },
    idpersona:{
        type:DataType.INTEGER,
        allowNull:false
    },
    idsucursal:{
        type:DataType.INTEGER,
        allowNull:false
    },
},
{
    tableName:"Usuario",
    timestamps:false
})

usuario.hasOne(sucursal,{
    foreignKey:"idsucursal",
    primaryKey:"idsucursal",
    sourceKey:"idsucursal"
})

usuario.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona",
    sourceKey:"idpersona"
})

module.exports=usuario