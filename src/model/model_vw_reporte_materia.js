const { DataTypes } = require("sequelize")
const database = require("../database")

const vw_reporte_mat = database.define("vw_reporte_materia", {
    numero: { type: DataTypes.INTEGER,primaryKey: true },
    grado: { type: DataTypes.STRING },
    armas: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING, },
    apellido: { type: DataTypes.STRING, },
    documento: { type: DataTypes.STRING, },
    idinstructor: { type: DataTypes.INTEGER,primaryKey: true },
    idusuario: { type: DataTypes.INTEGER, primaryKey: true},
    idturno: { type: DataTypes.INTEGER,primaryKey: true },
    idinscripcion: { type: DataTypes.INTEGER, primaryKey: true},
    idmateria: { type: DataTypes.INTEGER,primaryKey: true },
    idpersona: { type: DataTypes.INTEGER,primaryKey: true },
    descripcion: { type: DataTypes.STRING, },
    idconvocatoria: { type: DataTypes.INTEGER, },
    cpp: { type: DataTypes.DECIMAL, },
    tp: { type: DataTypes.DECIMAL, },
    exp: { type: DataTypes.DECIMAL, },
    ct: { type: DataTypes.DECIMAL, },
    exf: { type: DataTypes.DECIMAL, },
    cf: { type: DataTypes.DECIMAL, },
    comp: { type: DataTypes.DECIMAL, },
    extr: { type: DataTypes.DECIMAL, },
    calificacion: { type: DataTypes.INTEGER, },
    calificacion_desc: { type: DataTypes.STRING, },
    anho: { type: DataTypes.STRING, },
    turno: { type: DataTypes.STRING, },
    curso: { type: DataTypes.STRING, },
}, {
    tableName: "vw_reporte_materia",
    timestamps: false
})

module.exports = vw_reporte_mat