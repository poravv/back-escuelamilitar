const{DataTypes}=require("sequelize")
const database = require("../database")
const anho_lectivo=require("./model_anho_lectivo")
const curso=require("./model_curso")
const turno=require("./model_turno")

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
    idturno: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName:"Planificacion",
    timestamps:false
})

planificacion.hasOne(anho_lectivo,{
    foreignKey:"idanho_lectivo",
    primaryKey:"idanho_lectivo"
})


planificacion.hasOne(curso,{
    foreignKey:"idcurso",
    primaryKey:"idcurso"
})


planificacion.hasOne(turno,{
    foreignKey:"idturno",
    primaryKey:"idturno"
})

module.exports=planificacion