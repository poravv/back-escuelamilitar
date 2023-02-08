const{DataTypes}=require("sequelize")
const database = require("../database")
const persona=require("./model_persona")

const faltas=database.define("faltas",{
    idfaltas:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    registro:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
    ausen:{
        type: DataTypes.STRING,
        allowNull:false
    },
    descuento:{
        type: DataTypes.STRING,
        allowNull:false
    },
    idpersona: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName:"Faltas",
    timestamps:false
})

faltas.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona"
})
module.exports=faltas