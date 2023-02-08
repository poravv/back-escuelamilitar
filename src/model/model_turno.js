const{DataTypes}=require("sequelize")
const database=require("../database")

const turno = database.define("turno",{
    
    idturno:{
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
    tableName:"Turno",
    timestamps:false
})

module.exports=turno
