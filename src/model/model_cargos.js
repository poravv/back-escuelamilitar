const{DataTypes}=require("sequelize")
const database=require("../database")

const cargos = database.define("cargos",{
    
    idcargos:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    descripcion:{
        type:DataTypes.STRING,
        //allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        //allowNull:true
    },
    det1:{
        type:DataTypes.STRING,
        //allowNull:true
    },
    det2:{
        type:DataTypes.STRING,
        //allowNull:true
    },
},{
    tableName:"cargos",
    timestamps:false
})

module.exports=cargos
