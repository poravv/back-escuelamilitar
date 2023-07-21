const{DataTypes}=require("sequelize")
const database = require("../database")
const anho_lectivo=require("./model_anho_lectivo")
const planificacion=require("./model_planificacion")
const turno=require("./model_turno")

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
        //allowNull:false
    },
    monto_cuota:{
        type: DataTypes.DECIMAL,
        //allowNull:false
    },
    finicio:{
        type:DataTypes.DATE,
        allowNull:false
    },
    mmora:{
        type: DataTypes.STRING,
        //allowNull:false
    },
    estado:{
        type: DataTypes.STRING,
        allowNull:false
    },
    idanho_lectivo: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idturno: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idplanificacion: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    ffin:{
        type:DataTypes.DATE,
        allowNull:false
    },
    modalidad: {
        type: DataTypes.STRING,
    },
},{
    tableName:"convocatoria",
    timestamps:false
})

convocatoria.hasOne(anho_lectivo,{
    foreignKey:"idanho_lectivo",
    primaryKey:"idanho_lectivo",
    //sourceKey:"idanho_lectivo"
})

convocatoria.hasOne(planificacion,{
    foreignKey:"idplanificacion",
    primaryKey:"idplanificacion",
    sourceKey:"idplanificacion"
})

convocatoria.hasOne(turno,{
    foreignKey:"idturno",
    primaryKey:"idturno",
    sourceKey:"idturno"
})

module.exports=convocatoria