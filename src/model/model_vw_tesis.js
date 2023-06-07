const{DataTypes}=require("sequelize")
const database=require("../database")

const vw_tesis = database.define("Vw_tesis",{
    
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
    },
    area:{
        type:DataTypes.STRING,
        //allowNull:true
    },
    linea_investigacion:{
        type:DataTypes.STRING,
        //allowNull:true
    },
},{
    tableName:"vw_tesis",
    timestamps:false
})

module.exports=vw_tesis
