const{DataTypes}=require("sequelize")
const database=require("../database")
const det_asistencia= require('./model_det_asistencia')

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
    },
    idturno:{
        type:DataTypes.INTEGER,
        //allowNull:true
    },
    iddet_planificacion:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
},{
    tableName:"Asistencia",
    timestamps:false
})


asistencia.hasMany(det_asistencia,{
    foreignKey:"idasistencia",
    primaryKey:"idasistencia",
    sourceKey:"idasistencia"
})

module.exports=asistencia;