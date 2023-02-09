const{DataTypes}=require("sequelize")
const database = require("../database")
const materia=require("./model_materia")
const planificacion=require("./model_planificacion")

const det_planificacion=database.define("det_planificacion",{
    idplanificacion:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    idmateria: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    idestado: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    carga_horaria:{
        type: DataTypes.STRING,
        allowNull:false
    },    
    
},{
    tableName:"Det_planificacion",
    timestamps:false
})

det_planificacion.hasOne(materia,{
    foreignKey:"idmateria",
    primaryKey:"idmateria"
})


det_planificacion.hasOne(planificacion,{
    foreignKey:"idplanificacion",
    primaryKey:"idplanificacion"
})



module.exports=det_planificacion