const express = require('express');
const rutas = express()

const ciudad = require('./servicios/ciudad')


rutas.use('/automot/api/ciudad',ciudad);

module.exports = rutas;