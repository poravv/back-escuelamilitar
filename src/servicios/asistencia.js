const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const asistencia = require("../model/model_asistencia")
const database = require('../database')
const{ QueryTypes }=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const asistenciaes = await database.query('select * from asistencia order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: asistenciaes
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    const asistenciaes = await asistencia.findAll();
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: asistenciaes
            })
        }
    })
})

routes.get('/getasistenciacab/:iddet_planificacion/:idturno', verificaToken, async (req, res) => {
    try {
        const asistenciaes = await database.query(`select * from vw_asistencia_cab where iddet_planificacion=${req.params.iddet_planificacion} and idturno = ${req.params.idturno} and estado='AC' order by fecha desc`,{type: QueryTypes.SELECT})
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: asistenciaes
            })
        }
    })
    } catch (error) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
    }
})



routes.get('/get/:idasistencia', verificaToken, async (req, res) => {
    const asistenciaes = await asistencia.findByPk(req.params.idasistencia)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: asistenciaes
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const asistenciaes = await asistencia.create(req.body, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                t.commit();
                console.log('Commitea')
                res.json({
                    mensaje: "Registro almacenado",
                    authData: authData,
                    body: asistenciaes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idasistencia', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const asistenciaes = await asistencia.update(req.body, { where: { idasistencia: req.params.idasistencia } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro actualizado",
                    authData: authData,
                    body: asistenciaes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idasistencia', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const asistenciaes = await asistencia.destroy({ where: { idasistencia: req.params.idasistencia } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});;
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro eliminado",
                    authData: authData,
                    body: asistenciaes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador,",er});
        t.rollback();
    }
})


module.exports = routes;