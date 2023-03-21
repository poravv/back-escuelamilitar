const{DataTypes}=require("sequelize")
const database = require("../database")
const anho_lectivo=require("./model_anho_lectivo")
const curso=require("./model_curso")
const det_planificacion=require("./model_det_planificacion")

const vw_planificacion=database.define("vw_planificacion",{
    idplanificacion:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fecha:{
        type:DataTypes.DATE,
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
    idcurso: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
},{
    tableName:"vw_planificacion",
    timestamps:false
})


vw_planificacion.hasMany(det_planificacion,{
    foreignKey:"idplanificacion",
    primaryKey:"idplanificacion",
    sourceKey:"idplanificacion"
});


vw_planificacion.hasOne(anho_lectivo,{
    foreignKey:"idanho_lectivo",
    primaryKey:"idanho_lectivo"
});


vw_planificacion.hasOne(curso,{
    foreignKey:"idcurso",
    primaryKey:"idcurso",
    sourceKey:"idcurso"
});


module.exports=vw_planificacion