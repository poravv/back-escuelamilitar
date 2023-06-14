const{DataTypes}=require("sequelize")
const database=require("../database")

const area = database.define("Area",{
    
    idarea:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    area:{
        type:DataTypes.STRING,
        //allowNull:false
    },
    linea_investigacion:{
        type:DataTypes.STRING,
        //allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        //allowNull:true
    }
},{
    tableName:"area",
    timestamps:false
})

module.exports=area