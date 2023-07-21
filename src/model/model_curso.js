const{DataTypes}=require("sequelize")
const database=require("../database")

const curso = database.define("curso",{
    
    idcurso:{
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
    tableName:"curso",
    timestamps:false
})

module.exports=curso
