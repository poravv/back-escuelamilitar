const{DataTypes}=require("sequelize")
const database = require('../database.js')
const inscripcion=require("./model_inscripcion")
const persona=require("./model_persona")

const evaluaciones = database.define("evaluaciones",{
    idmateria:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    tpi1:{
        type:DataTypes.INTEGER,
        
    },
    tpi2:{
        type:DataTypes.INTEGER,
    },
    exp1:{
        type:DataTypes.INTEGER,
    },
    tpg1:{
        type:DataTypes.INTEGER,
    },
    tpg2:{
        type:DataTypes.INTEGER,
    },
    tpg3:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    exf:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idinscripcion:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
    idpersona:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
},
{
    tableName:"Evaluaciones",
    timestamps:false
})

evaluaciones.hasOne(inscripcion,{
    foreignKey:"idinscripcion",
    primaryKey:"idinscripcion"
});

evaluaciones.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona"
});

module.exports=evaluaciones

