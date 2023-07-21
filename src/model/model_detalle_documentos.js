const{DataTypes}=require("sequelize")
const database = require('../database.js')
const documentos=require("./model_documentos")
const inscripcion=require("./model_inscripcion.js")

const detalle_documentos = database.define("detalle_documentos",{
    observacion:{
        type:DataTypes.STRING,
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
    idinscripcion:{
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
    tableName:"detalle_documentos",
    timestamps:false
})

detalle_documentos.hasOne(inscripcion,{
    foreignKey:"idinscripcion",
    primaryKey:"idinscripcion",
    sourceKey:"idinscripcion"
});

detalle_documentos.hasOne(documentos,{
    foreignKey:"iddocumentos",
    primaryKey:"iddocumentos",
    sourceKey:"iddocumentos"
});

module.exports=detalle_documentos

