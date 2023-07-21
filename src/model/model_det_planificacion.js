const{DataTypes}=require("sequelize")
const database = require("../database")
const materia=require("./model_materia")
const instructor=require("./model_instructor")

const det_planificacion=database.define("det_planificacion",{
    iddet_planificacion:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    carga_horaria:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull:false
    },  
    estado: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    idmateria: {
        type: DataTypes.INTEGER,
        allowNull:false,
        foreignKey:true
    },
    idplanificacion: {
        type: DataTypes.INTEGER,
        allowNull:false,
        foreignKey:true
    },
    idinstructor: {
        type: DataTypes.INTEGER,
        allowNull:false,
        foreignKey:true
    },
   
},{
    tableName:"det_planificacion",
    timestamps:false
})

det_planificacion.hasOne(materia,{
    foreignKey:"idmateria",
    primaryKey:"idmateria",
    sourceKey:"idmateria"
})

det_planificacion.hasOne(instructor,{
    foreignKey:"idinstructor",
    primaryKey:"idinstructor",
    sourceKey:"idinstructor"
})

module.exports=det_planificacion