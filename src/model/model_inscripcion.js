const{DataTypes}=require("sequelize")
const database = require("../database")
const convocatoria=require("./model_convocatoria")
const persona=require("./model_persona")

const inscripcion=database.define("inscripcion",{
    idinscripcion:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    idpersona:{
        type:DataTypes.INTEGER,
        //autoIncrement:true,
        primaryKey:true
    },
    estado:{
        type: DataTypes.STRING,
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
    idconvocatoria: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName:"Inscripcion",
    timestamps:false
})

inscripcion.hasOne(convocatoria,{
    foreignKey:"idconvocatoria",
    primaryKey:"idconvocatoria"
})

inscripcion.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona"
})

module.exports=inscripcion