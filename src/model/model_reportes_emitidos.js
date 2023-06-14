const { DataTypes } = require("sequelize")
const database = require("../database")

const reportes_emitidos = database.define("reportes_emitidos", {

    idreporte: { type: DataTypes.INTEGER,primaryKey: true },
    tipo: { type: DataTypes.STRING,},
    descripcion: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.STRING,},
    fecha: { type: DataTypes.DATE,},
    idinscripcion: { type: DataTypes.INTEGER,},
    idpersona: { type: DataTypes.INTEGER,},
}, {
    tableName: "Reportes_emitidos",
    timestamps: false
})

module.exports = reportes_emitidos