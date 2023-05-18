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
    numero:{
        type:DataTypes.INTEGER,
        //autoIncrement:true,
        //primaryKey:true
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
        allowNull:false,
        primaryKey:true
    }
},{
    tableName:"Inscripcion",
    timestamps:false
})


inscripcion.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona",
    sourceKey:"idpersona"
})


inscripcion.hasOne(convocatoria,{
    foreignKey:"idconvocatoria",
    primaryKey:"idconvocatoria",
    sourceKey:"idconvocatoria",
})

module.exports=inscripcion