const{DataTypes}=require("sequelize")
const database = require("../database")
const anho_lectivo=require("./model_anho_lectivo")
const planificacion=require("./model_planificacion")
const instructor=require("./model_instructor")

const convocatoria=database.define("convocatoria",{
    idconvocatoria:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    cupo:{
        type: DataTypes.STRING,
        allowNull:false
    },
    cant_cuotas:{
        type: DataTypes.STRING,
        allowNull:false
    },
    monto_cuota:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    finicio:{
        type:DataTypes.DATE,
        allowNull:false
    },
    mmora:{
        type: DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type: DataTypes.STRING,
        allowNull:false
    },
    idanho_lectivo: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idplanificacion: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idinstructor: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName:"Planificacion",
    timestamps:false
})

convocatoria.hasOne(anho_lectivo,{
    foreignKey:"idanho_lectivo",
    primaryKey:"idanho_lectivo"
})

convocatoria.hasOne(planificacion,{
    foreignKey:"idplanificacion",
    primaryKey:"idplanificacion"
})

convocatoria.hasOne(instructor,{
    foreignKey:"idinstructor",
    primaryKey:"idinstructor"
})

module.exports=convocatoria