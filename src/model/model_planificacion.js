const{DataTypes}=require("sequelize")
const database = require("../database")
const anho_lectivo=require("./model_anho_lectivo")
const sucursal=require("./model_sucursal")
const curso=require("./model_curso")
const det_planificacion=require("./model_det_planificacion")

const planificacion=database.define("planificacion",{
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
    titulo_obtenido: {
        type: DataTypes.STRING,
        allowNull:false
    },
    duracion: {
        type: DataTypes.STRING,
        allowNull:false
    },
    idsucursal: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
},{
    tableName:"planificacion",
    timestamps:false
})


planificacion.hasMany(det_planificacion,{
    foreignKey:"idplanificacion",
    primaryKey:"idplanificacion",
    sourceKey:"idplanificacion"
});

planificacion.hasMany(sucursal,{
    foreignKey:"idsucursal",
    primaryKey:"idsucursal",
    sourceKey:"idsucursal"
});


planificacion.hasOne(anho_lectivo,{
    foreignKey:"idanho_lectivo",
    primaryKey:"idanho_lectivo"
});


planificacion.hasOne(curso,{
    foreignKey:"idcurso",
    primaryKey:"idcurso",
    sourceKey:"idcurso"
});


module.exports=planificacion