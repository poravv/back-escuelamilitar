const{DataTypes}=require("sequelize")
const database=require("../database")

const ciudad = database.define("grados_arma",{
    idgrados_arma:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    grado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    armas:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    tableName:"grados_arma",
    timestamps:false
})

module.exports=ciudad
