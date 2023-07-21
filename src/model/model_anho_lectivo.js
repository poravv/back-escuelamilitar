const{DataTypes}=require("sequelize")
const database=require("../database")

const anho_lectivo = database.define("anho_lectivo",{
    
    idanho_lectivo:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    anho:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    tableName:"anho_lectivo",
    timestamps:false
})

module.exports=anho_lectivo
