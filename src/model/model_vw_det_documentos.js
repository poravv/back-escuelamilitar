const{DataTypes}=require("sequelize")
const database = require('../database.js')

const vw_det_documentos = database.define("vw_det_documentos",{
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
    iddocumentos:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
    descripcion:{
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
},
{
    tableName:"Vw_det_documentos",
    timestamps:false
})

module.exports=vw_det_documentos

