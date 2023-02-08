const{DataTypes}=require("sequelize")
const database=require("../database")

const documentos = database.define("documentos",{
    
    iddocumentos:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    tableName:"Documentos",
    timestamps:false
})

module.exports=documentos
