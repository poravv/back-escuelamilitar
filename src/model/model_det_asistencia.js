const{DataTypes}=require("sequelize")
const database = require("../database")
const persona=require("./model_persona")
const asistencia=require("./model_asistencia")
const inscripcion=require("./model_inscripcion")

const det_asistencia=database.define("det_asistencia",{
    idpersona:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    idasistencia:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    asistencia:{
        type: DataTypes.STRING,
        allowNull:false
    },
    observacion:{
        type: DataTypes.STRING,
        allowNull:false
    },

},{
    tableName:"Det_asistencia",
    timestamps:false
})

det_asistencia.hasOne(asistencia,{
    foreignKey:"idasistencia",
    primaryKey:"idasistencia"
})

det_asistencia.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona"
})

det_asistencia.hasOne(inscripcion,{
    foreignKey:"idinscripcion",
    primaryKey:"idinscripcion"
})

module.exports=det_asistencia