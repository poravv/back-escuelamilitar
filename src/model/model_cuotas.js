const{DataTypes}=require("sequelize")
const database = require("../database")
const inscripcion=require("./model_inscripcion")
const persona=require("./model_persona")

const cuotas=database.define("cuotas",{
    idcuotas:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fgeneracion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fvencimiento:{
        type:DataTypes.DATE,
        allowNull:false
    },
    mmora:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    fpago:{
        type: DataTypes.DATE,
        allowNull:false
    },
    estado:{
        type: DataTypes.STRING,
        allowNull:false
    },
    idinscripcion: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idpersona: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName:"Sucursal",
    timestamps:false
})

cuotas.hasOne(inscripcion,{
    foreignKey:"idinscripcion",
    primaryKey:"idinscripcion"
})

cuotas.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona"
})

module.exports=cuotas