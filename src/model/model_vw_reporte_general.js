const { DataTypes } = require("sequelize")
const database = require("../database")

const vw_reporte_gral = database.define("vw_reporte_general", {
    nombres: {type: DataTypes.STRING,},
    documento: {type: DataTypes.STRING},
    idinscripcion: {type: DataTypes.INTEGER,primaryKey: true},
    idpersona: {type: DataTypes.INTEGER,},
    idconvocatoria: {type: DataTypes.INTEGER,primaryKey: true},
    anho: { type: DataTypes.STRING },
    tipo: { type: DataTypes.STRING },
    columna1: { type: DataTypes.STRING },
    columna2: { type: DataTypes.STRING },
    columna3: { type: DataTypes.STRING },
    columna4: { type: DataTypes.STRING },
    columna5: { type: DataTypes.STRING },
    columna6: { type: DataTypes.STRING },
    columna7: { type: DataTypes.STRING },
    columna8: { type: DataTypes.STRING },
    columna9: { type: DataTypes.STRING },
    columna10: { type: DataTypes.STRING },
    columna11: { type: DataTypes.STRING },
    columna12: { type: DataTypes.STRING },
    columna13: { type: DataTypes.STRING },
    columna14: { type: DataTypes.STRING },
    columna15: { type: DataTypes.STRING },
    columna16: { type: DataTypes.STRING },
    columna17: { type: DataTypes.STRING },
    columna18: { type: DataTypes.STRING },
    columna19: { type: DataTypes.STRING },
}, {
    tableName: "vw_reporte_general",
    timestamps: false
})

module.exports = vw_reporte_gral