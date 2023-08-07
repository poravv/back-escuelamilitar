const{DataTypes}=require("sequelize")
const database=require("../database")

const area = database.define("area",{
    
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
    sublinea:{
        type:DataTypes.STRING,
        //allowNull:true
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
