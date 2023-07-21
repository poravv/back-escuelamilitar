const{DataTypes}=require("sequelize")
const database = require("../database")
const ciudad=require("./model_ciudad")

const sucursal=database.define("sucursal",{
    idsucursal:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    sucursal:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ruc:{
        type:DataTypes.STRING,
        //allowNull:false
    },
    direccion:{
        type: DataTypes.STRING,
        //allowNull:false
    },
    estado:{
        type: DataTypes.STRING,
        allowNull:false
    },
    director:{
        type: DataTypes.STRING,
        allowNull:false
    },
    img:{
        type:DataTypes.BLOB("long")
    },
    idciudad: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    director: {
        type: DataTypes.STRING,
        allowNull:false
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:"sucursal",
    timestamps:false
})

sucursal.hasOne(ciudad,{
    foreignKey:"idciudad",
    primaryKey:"idciudad"
})

module.exports=sucursal