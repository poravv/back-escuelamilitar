const{DataTypes}=require("sequelize")
const database = require('../database.js')
const ciudad=require("./model_ciudad")
const grados_arma=require("./model_grados_arma")

const persona = database.define("persona",{
    idpersona:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fnacimiento:{
        type:DataTypes.DATE,
        allowNull:false
    },
    sexo:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    documento:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    photo:{
        type:DataTypes.BLOB("long")
    },
    tipo_doc:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nacionalidad:{
        type:DataTypes.STRING,
        allowNull:false
    },
    correo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    telefono:{
        type:DataTypes.STRING,
        allowNull:false
    },
    registro:{
        type:DataTypes.STRING,
    },
    idciudad:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idgrados_arma:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},
{
    tableName:"persona",
    timestamps:false
})

persona.hasOne(ciudad,{
    foreignKey:"idciudad",
    primaryKey:"idciudad",
    sourceKey:"idciudad",
});

persona.hasOne(grados_arma,{
    foreignKey:"idgrados_arma",
    primaryKey:"idgrados_arma",
    sourceKey:"idgrados_arma",
});


module.exports=persona

