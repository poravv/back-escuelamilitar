const { DataTypes } = require("sequelize")
const database = require("../database")

const vw_mat_cnv = database.define("vw_mat_cnv", {

    idmateria: { type: DataTypes.INTEGER,primaryKey: true },
    materia: { type: DataTypes.STRING,},
    idconvocatoria: { type: DataTypes.INTEGER,primaryKey: true },
    descripcion: { type: DataTypes.STRING,},
}, {
    tableName: "vw_mat_cnv",
    timestamps: false
})

module.exports = vw_mat_cnv