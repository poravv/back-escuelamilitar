const{DataTypes}=require("sequelize")
const database=require("../database")

const asistencia = database.define("asistencia",{
    
    idasistencia:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    tableName:"Asistencia",
    timestamps:false
})

module.exports=asistencia
