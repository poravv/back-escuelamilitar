const{DataTypes}=require("sequelize")
const database=require("../database")

const ciudad = database.define("materia",{
    
    idmateria:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    observacion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    tableName:"Materia",
    timestamps:false
})

module.exports=ciudad
