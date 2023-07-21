const DataTypes = require('sequelize')
const database = require('../database')
const sucursal= require('./model_sucursal')
const persona= require('./model_persona')

const usuario= database.define("usuario",{
    idusuario:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    usuario:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nivel:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idpersona:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idsucursal:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},
{
    tableName:"usuario",
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