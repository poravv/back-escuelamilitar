const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const det_asistencia = require("../model/model_det_asistencia")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {

    const det_asistencias = await database.query('select * from det_asistencia order by descripcion asc',{type: QueryTypes.SELECT})
    
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: det_asistencias
            })
        }
    })
})

routes.get('/getdetalle/:idasistencia', verificaToken, async (req, res) => {
    
    await database.query(`CALL p_genera_asistencia(${req.params.idasistencia},@a);`);

    const det_asistencias = await database.query(`select * from vw_asisdet where idasistencia = ${req.params.idasistencia}`,{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: det_asistencias
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const det_asistencias = await det_asistencia.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: det_asistencias
            })
        }

    })
})

routes.get('/get/:iddet_asistencia', verificaToken, async (req, res) => {
    const det_asistencias = await det_asistencia.findByPk(req.params.iddet_asistencia)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: det_asistencias
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const det_asistencias = await det_asistencia.create(req.body, {
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
                    body: det_asistencias
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:iddet_asistencia', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const det_asistencias = await det_asistencia.update(req.body, { where: { iddet_asistencia: req.params.iddet_asistencia } }, {
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
                    body: det_asistencias
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:iddet_asistencia', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const det_asistencias = await det_asistencia.destroy({ where: { iddet_asistencia: req.params.iddet_asistencia } }, {
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
                    body: det_asistencias
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;