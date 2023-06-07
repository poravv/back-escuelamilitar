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
const area = require('./servicios/area')
const tesis = require('./servicios/tesis')
const usuario = require('./servicios/usuario')
const aptitud = require('./servicios/aptitud')
const reportes = require('./servicios/reportes')
const reportes_emitidos = require('./servicios/reportes_emitidos')


rutas.use('/empy/api/ciudad',ciudad);   
rutas.use('/empy/api/aptitud',aptitud);
rutas.use('/empy/api/anho_lectivo',anho_lectivo);
rutas.use('/empy/api/asistencia',asistencia);
rutas.use('/empy/api/convocatoria',convocatoria);
rutas.use('/empy/api/cuotas',cuotas);
rutas.use('/empy/api/area',area);
rutas.use('/empy/api/tesis',tesis);
rutas.use('/empy/api/curso',curso);
rutas.use('/empy/api/det_asistencia',det_asistencia);
rutas.use('/empy/api/det_planificacion',det_planificacion);
rutas.use('/empy/api/detalle_documentos',detalle_documentos);
rutas.use('/empy/api/documentos',documentos);
rutas.use('/empy/api/evaluaciones',evaluaciones);
rutas.use('/empy/api/faltas',faltas);
rutas.use('/empy/api/grados_arma',grados_arma);
rutas.use('/empy/api/inscripcion',inscripcion);
rutas.use('/empy/api/instructor',instructor);
rutas.use('/empy/api/materia',materia);
rutas.use('/empy/api/persona',persona);
rutas.use('/empy/api/planificacion',planificacion);
rutas.use('/empy/api/sucursal',sucursal);
rutas.use('/empy/api/turno',turno);
rutas.use('/empy/api/usuario',usuario);
rutas.use('/empy/api/reportes',reportes);
rutas.use('/empy/api/reportes_emitidos',reportes_emitidos);

module.exports = rutas;