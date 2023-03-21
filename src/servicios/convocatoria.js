const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const convocatoria = require("../model/model_convocatoria")
const vw_convocatoria = require("../model/model_vwconvocatoria")
const planificacion = require("../model/model_planificacion")
const curso = require("../model/model_curso")
const turno = require("../model/model_turno")
const database = require('../database')
const{ QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const convocatoriaes = await database.query('select * from convocatoria order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: convocatoriaes
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    try {
        const planificaciones = await vw_convocatoria.findAll({include: [
            { model: planificacion,include: [
                { model: curso },
            ] }
            ,{ model: turno },]});
    
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
        res.json({ error: "Error" });
    }
})

routes.get('/get1/', verificaToken, async (req, res) => {
    
    const convocatoriaes = await convocatoria.findAll({include: [
        { model: planificacion,include: [
            { model: curso },
        ] }
        ,{ model: turno },]});

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: convocatoriaes
            })
        }

    })
})

routes.get('/get/:idconvocatoria', verificaToken, async (req, res) => {
    const convocatoriaes = await convocatoria.findByPk(req.params.idconvocatoria,{include: [
        { model: planificacion,include: [
            { model: curso },
        ] }
        ,{ model: turno },]})
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: convocatoriaes
            });
        }
    })
})


routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    console.log(req.body)
    try {
        const convocatoriaes = await convocatoria.create(req.body, {
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
                    body: convocatoriaes
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idconvocatoria', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const convocatoriaes = await convocatoria.update(req.body, { where: { idconvocatoria: req.params.idconvocatoria } }, {
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
                    body: convocatoriaes
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idconvocatoria', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const convocatoriaes = await convocatoria.destroy({ where: { idconvocatoria: req.params.idconvocatoria } }, {
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
                    body: convocatoriaes
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;