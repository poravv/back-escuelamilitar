const{DataTypes}=require("sequelize")
const database = require('../database.js')
const documentos=require("./model_documentos")
const persona=require("./model_persona")

const detalle_documentos = database.define("detalle_documentos",{
    observacion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    img:{
        type:DataTypes.BLOB("long")
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    iddocumentos:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
    idpersona:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
},
{
    tableName:"Detalle_documentos",
    timestamps:false
})

detalle_documentos.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona"
});

detalle_documentos.hasOne(documentos,{
    foreignKey:"iddocumentos",
    primaryKey:"iddocumentos"
});

module.exports=persona

