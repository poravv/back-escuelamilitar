const express = require('express');
const rutas = express()

const ciudad = require('./servicios/ciudad')
const marca = require('./servicios/marca')
const detmodelo = require('./servicios/detmodelo')
const modelo = require('./servicios/modelo')
const cliente = require('./servicios/cliente')
const sucursal = require('./servicios/sucursal')
const persona = require('./servicios/persona')
const usuario = require('./servicios/usuario');
const proveedor = require('./servicios/proveedor');
const venta = require('./servicios/venta');
const detventa = require('./servicios/detventa');
const preg_seguridad = require('./servicios/preg_seguridad');

rutas.use('/automot/api/ciudad',ciudad);
rutas.use('/automot/api/marca',marca);
rutas.use('/automot/api/modelo',modelo);
rutas.use('/automot/api/detmodelo',detmodelo);
rutas.use('/automot/api/cliente',cliente);
rutas.use('/automot/api/sucursal',sucursal);
rutas.use('/automot/api/persona',persona)
rutas.use('/automot/api/usuario',usuario)
rutas.use('/automot/api/proveedor',proveedor)
rutas.use('/automot/api/venta',venta)
rutas.use('/automot/api/detventa',detventa)
rutas.use('/automot/api/pregseguridad',preg_seguridad)

module.exports = rutas;