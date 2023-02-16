const{DataTypes}=require("sequelize")
const database = require("../database")
const persona=require("./model_persona")

const instructor=database.define("instructor",{
    idinstructor:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    observacion:{
        type:DataTypes.STRING,
        //allowNull:false
    },
    idpersona: {
        type: DataTypes.INTEGER,
        allowNull:false,
        //foreignKey:true,
        required:true
    }
},{
    tableName:"Instructor",
    timestamps:false
})


instructor.hasOne(persona,{
    foreignKey:"idpersona",
    primaryKey:"idpersona",
    sourceKey:"idpersona"
    //as:"idpersona",
}) 

//Model.belongsTo(models.ModelName, { foreignKey: 'your_key', as:'your_identifier' });

module.exports=instructor