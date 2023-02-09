const express = require('express');
const rutas = express()

const ciudad = require('./servicios/ciudad')
const anho_lectivo = require('./servicios/anho_lectivo')
const asistencia = require('./servicios/asistencia')
const convocatoria = require('./servicios/convocatoria')
const cuotas = require('./servicios/cuotas')
const curso = require('./servicios/curso')
const det_asistencia = require('./servicios/det_asistencia')
const det_planificacion = require('./servicios/det_planificacion')
const detalle_documentos = require('./servicios/detalle_documentos')
const documentos = require('./servicios/documentos')
const evaluaciones = require('./servicios/evaluaciones')
const faltas = require('./servicios/faltas')
const grados_arma = require('./servicios/grados_arma')
const inscripcion = require('./servicios/inscripcion')
const instructor = require('./servicios/instructor')
const materia = require('./servicios/materia')
const persona = require('./servicios/persona')
const planificacion = require('./servicios/planificacion')
const sucursal = require('./servicios/sucursal')
const turno = require('./servicios/turno')
const usuario = require('./servicios/usuario')


rutas.use('/automot/api/ciudad',ciudad);
rutas.use('/automot/api/anho_lectivo',anho_lectivo);
rutas.use('/automot/api/asistencia',asistencia);
rutas.use('/automot/api/convocatoria',convocatoria);
rutas.use('/automot/api/cuotas',cuotas);
rutas.use('/automot/api/curso',curso);
rutas.use('/automot/api/det_asistencia',det_asistencia);
rutas.use('/automot/api/det_planificacion',det_planificacion);
rutas.use('/automot/api/detalle_documentos',detalle_documentos);
rutas.use('/automot/api/documentos',documentos);
rutas.use('/automot/api/evaluaciones',evaluaciones);
rutas.use('/automot/api/faltas',faltas);
rutas.use('/automot/api/grados_arma',grados_arma);
rutas.use('/automot/api/inscripcion',inscripcion);
rutas.use('/automot/api/instructor',instructor);
rutas.use('/automot/api/materia',materia);
rutas.use('/automot/api/persona',persona);
rutas.use('/automot/api/planificacion',planificacion);
rutas.use('/automot/api/sucursal',sucursal);
rutas.use('/automot/api/turno',turno);
rutas.use('/automot/api/usuario',usuario);

module.exports = rutas;