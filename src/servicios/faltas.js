const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const faltas = require("../model/model_faltas")
const vwfaltas = require("../model/model_vwfaltas")
const database = require('../database')
const { QueryTypes } = require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    try {
        const rsfaltas = await database.query('select * from faltas order by descripcion asc', { type: QueryTypes.SELECT })
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: rsfaltas
                })
            }
        })
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
    }
})


routes.get('/get/', verificaToken, async (req, res) => {

    try {
        //const rsfaltas = await vwfaltas.findAll();
        const rsfaltas = await database.query('select * from vw_faltas', { type: QueryTypes.SELECT })

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });;
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: rsfaltas
                })
            }
        })
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
    }
})

routes.get('/getfaltasinst/:idusuario', verificaToken, async (req, res) => {

    try {
        //console.log(req.params.idusuario)        
        //const rsfaltas = await vwfaltas.findAll({ idusuario: req.params.idusuario });
        const rsfaltas = await database.query(`select * from vw_faltas`, { type: QueryTypes.SELECT })

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });;
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: rsfaltas
                })
            }
        })
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
    }
})

routes.get('/getfaltas/:idasistencia/:idinscripcion/:idpersona', verificaToken, async (req, res) => {
    try {
        const rsfaltas = await vwfaltas.findAll({ where: { idasistencia: req.params.idasistencia, idinscripcion: req.params.idinscripcion, idpersona: req.params.idpersona } });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });;
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: rsfaltas
                });
            }
        })
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
    }
})

routes.get('/get/:idfaltas', verificaToken, async (req, res) => {
    const rsfaltas = await faltas.findByPk(req.params.idfaltas)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });;
        } else {

            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rsfaltas
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();

    try {
        const rsfaltas = await faltas.create(req.body, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
            } else {
                t.commit();
                console.log('Commitea')
                res.json({
                    mensaje: "Registro almacenado",
                    authData: authData,
                    body: rsfaltas
                })
            }
        })
    } catch (er) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idfaltas', verificaToken, async (req, res) => {

    console.log(req.body)
    try {
        const t = await database.transaction();
        const rsfaltas = await faltas.update(req.body, { where: { idfaltas: req.params.idfaltas } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro actualizado",
                    authData: authData,
                    body: rsfaltas
                })
            }
        })
    } catch (er) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idfaltas', verificaToken, async (req, res) => {

    const t = await database.transaction();

    try {
        const rsfaltas = await faltas.destroy({ where: { idfaltas: req.params.idfaltas } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });;
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro eliminado",
                    authData: authData,
                    body: rsfaltas
                })
            }
        })
    } catch (er) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        t.rollback();
    }
})

module.exports = routes;