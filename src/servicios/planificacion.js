const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const planificacion = require("../model/model_planificacion")
const vw_planificacion = require("../model/model_vwplanificacion")
const curso = require("../model/model_curso")
const materia = require("../model/model_materia")
const instructor = require("../model/model_instructor")
const persona = require("../model/model_persona")
const det_planificacion = require("../model/model_det_planificacion")
const grados_arma = require("../model/model_grados_arma")
const database = require('../database')
const { QueryTypes } = require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const planificaciones = await database.query('select * from planificacion order by descripcion asc', { type: QueryTypes.SELECT })
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({ error: "Error ", err });
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: planificaciones
            })
        }
    })
})

routes.get('/getplaninst/:idpersona', verificaToken, async (req, res) => {
    try {
        const planificaciones = await database.query(`select * from vw_curso_instructor where idpersona = ${req.params.idpersona}`, { type: QueryTypes.SELECT });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error ", err });
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: planificaciones
                })
            }
        })
    } catch (error) {
        res.json({ error: "Error ", error });
    }
})

routes.get('/get/', verificaToken, async (req, res) => {
    try {
        const planificaciones = await vw_planificacion.findAll({
            include: [
                { model: curso },
                {
                    model: det_planificacion,
                    include: [
                        { model: materia, },
                        { model: instructor, include: [{ model: persona, include: [{ model: grados_arma }] }] }
                    ]
                }
            ]
        });

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error ", err });;
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: planificaciones
                })
            }

        })
    } catch (error) {
        res.json({ error: "Error" });
    }
})

routes.get('/get1/', verificaToken, async (req, res) => {
    const planificaciones = await planificacion.findAll({
        include: [
            { model: curso },
            {
                model: det_planificacion,
                include: [
                    { model: materia, },
                    { model: instructor, include: [{ model: persona, include: [{ model: grados_arma }] }] }
                ]
            }
        ]
    });



    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({ error: "Error ", err });;
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: planificaciones
            })
        }

    })
})

routes.get('/get/:idplanificacion', verificaToken, async (req, res) => {
    const planificaciones = await planificacion.findByPk(req.params.idplanificacion)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({ error: "Error ", err });;
        } else {

            res.json({
                mensaje: "successfully",
                authData: authData,
                body: planificaciones
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();

    try {
        const planificaciones = await planificacion.create(req.body, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error ", err });
            } else {
                t.commit();
                console.log('Commitea')
                res.json({
                    mensaje: "Registro almacenado",
                    authData: authData,
                    body: planificaciones
                })
            }
        })
    } catch (er) {
        res.json({ error: "error catch" });
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idplanificacion', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const planificaciones = await planificacion.update(req.body, { where: { idplanificacion: req.params.idplanificacion } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error ", err });
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro actualizado",
                    authData: authData,
                    body: planificaciones
                })
            }
        })
    } catch (er) {
        res.json({ error: "error catch" });
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idplanificacion', verificaToken, async (req, res) => {

    const t = await database.transaction();

    try {
        const planificaciones = await planificacion.destroy({ where: { idplanificacion: req.params.idplanificacion } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error ", err });;
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro eliminado",
                    authData: authData,
                    body: planificaciones
                })
            }
        })
    } catch (er) {
        res.json({ error: "error catch" });
        t.rollback();
    }
})


module.exports = routes;