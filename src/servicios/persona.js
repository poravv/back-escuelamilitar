const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const persona = require("../model/model_persona")
const grados_arma = require("../model/model_grados_arma")
const ciudad = require("../model/model_ciudad")
const database = require('../database')
const{ QueryTypes }=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const personaes = await database.query('select * from persona order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: personaes
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const personaes = await persona.findAll({include: [{ model: grados_arma },{ model: ciudad }]});
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: personaes
            })
        }

    })
})

routes.get('/get/:idpersona', verificaToken, async (req, res) => {
    const personaes = await persona.findByPk(req.params.idpersona)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: personaes
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    console.log(req.body)
    const t = await database.transaction();
    
    try {
        const personaes = await persona.create(req.body, {
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
                    body: personaes
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idpersona', verificaToken, async (req, res) => {

    //console.log(req.params.idpersona)
    console.log(req.body)
    const t = await database.transaction();
    try {
        const personaes = await persona.update(req.body, { where: { idpersona: req.params.idpersona } }, {
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
                    body: personaes
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idpersona', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const personaes = await persona.destroy({ where: { idpersona: req.params.idpersona } }, {
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
                    body: personaes
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;