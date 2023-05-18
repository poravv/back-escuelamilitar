const{DataTypes}=require("sequelize")
const database = require('../database.js')
const inscripcion=require("./model_inscripcion")
const persona=require("./model_persona")

const evaluaciones = database.define("evaluaciones",{
    idmateria:{
        type:DataTypes.INTEGER,
        primaryKey:true,
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
    cpp:{
        type:DataTypes.DECIMAL,
        
    },
    tp:{
        type:DataTypes.DECIMAL,
    },
    exp:{
        type:DataTypes.DECIMAL,
    },
    exf:{
        type:DataTypes.DECIMAL,
    },
    comp:{
        type:DataTypes.DECIMAL,
    },
    extr:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
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

