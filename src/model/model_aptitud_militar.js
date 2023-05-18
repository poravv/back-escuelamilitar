const{DataTypes}=require("sequelize")
const database=require("../database")

const aptitud_militar = database.define("Aptitud_militar",{
    
    idaptitud_militar:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    descripcion:{
        type:DataTypes.STRING,
        //allowNull:false
    },
    punto:{
        type:DataTypes.DECIMAL,
        //allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        //allowNull:true
    }
},{
    tableName:"aptitud_militar",
    timestamps:false
})

module.exports=aptitud_militar
