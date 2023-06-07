const{DataTypes}=require("sequelize")
const database=require("../database")

const tesis = database.define("Tesis",{
    
    idtesis:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    idinscripcion:{
        type:DataTypes.INTEGER,
    },
    idpersona:{
        type:DataTypes.INTEGER,
    },
    puntaje:{
        type:DataTypes.INTEGER,
    },
    fecha_defensa:{
        type:DataTypes.DATE,
        //allowNull:false
    },
    titulo:{
        type:DataTypes.STRING,
        //allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        //allowNull:true
    },
    idarea:{
        type:DataTypes.INTEGER,
        //allowNull:true
    }
},{
    tableName:"tesis",
    timestamps:false
})

module.exports=tesis
