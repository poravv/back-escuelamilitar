const { DataTypes } = require("sequelize")
const database = require("../database")

const vw_certificado_cab = database.define("vw_certificado_cab", {
    idinscripcion: { type: DataTypes.INTEGER,primaryKey: true },
    nombres: { type: DataTypes.STRING,},
    documento: { type: DataTypes.STRING },
    fnacimiento: { type: DataTypes.DATE,},
    nacionalidad: { type: DataTypes.STRING,},
    sexo: { type: DataTypes.STRING,},
    idconvocatoria: { type: DataTypes.INTEGER,},
    label: { type: DataTypes.STRING,},
    gentilicio: { type: DataTypes.STRING,},
    titulo: { type: DataTypes.STRING,},
    fecha_defensa: { type: DataTypes.DATE,},
    titulo_obtenido: { type: DataTypes.STRING,},
    linea_investigacion: { type: DataTypes.STRING,},
    area: { type: DataTypes.STRING,},
    duracion: { type: DataTypes.STRING,},
    curso: { type: DataTypes.STRING,},
    anho: { type: DataTypes.STRING,},
    horas_catedras: { type: DataTypes.STRING,},
    modalidad: { type: DataTypes.STRING,},
    repo_numero: { type: DataTypes.STRING,},
    promedio: { type: DataTypes.STRING,},
    letra_promedio: { type: DataTypes.STRING,},
    sucursal: { type: DataTypes.STRING,},
    img: { type:DataTypes.BLOB("long")},
    director: { type: DataTypes.STRING,},
    cargo: { type: DataTypes.STRING,},
    idtesis: { type: DataTypes.INTEGER,},
}, {
    tableName: "Vw_certificado_cab",
    timestamps: false
})

module.exports = vw_certificado_cab