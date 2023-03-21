const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const anho_lectivo = require("../model/model_anho_lectivo")
const database = require('../database')
const { QueryTypes } = require('sequelize');
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getunique/', verificaToken, async (req, res) => {
    const anho_lectivoes = await database.query(`select * from anho_lectivo where estado='AC' order by anho desc LIMIT 1`,{type: QueryTypes.SELECT})
    //console.log(anho_lectivoes);
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: anho_lectivoes
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    const anho_lectivoes = await anho_lectivo.findAll();
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: anho_lectivoes
            })
        }

    })
})

routes.get('/get/:idanho_lectivo', verificaToken, async (req, res) => {
    const anho_lectivoes = await anho_lectivo.findByPk(req.params.idanho_lectivo)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: anho_lectivoes
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const anho_lectivoes = await anho_lectivo.create(req.body, {
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
                    body: anho_lectivoes
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idanho_lectivo', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const anho_lectivoes = await anho_lectivo.update(req.body, { where: { idanho_lectivo: req.params.idanho_lectivo } }, {
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
                    body: anho_lectivoes
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idanho_lectivo', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const anho_lectivoes = await anho_lectivo.destroy({ where: { idanho_lectivo: req.params.idanho_lectivo } }, {
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
                    body: anho_lectivoes
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;