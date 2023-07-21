const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const tesis = require("../model/model_tesis")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor');
const vw_tesis = require('../model/model_vw_tesis');
require("dotenv").config()

routes.get('/getsql/', verificaToken, async (req, res) => {
    const tesises = await database.query('select * from tesis order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: tesises
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const tesises = await tesis.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: tesises
            })
        }

    })
})

routes.get('/getvw/:idinscripcion', verificaToken, async (req, res) => {
    const tesises = await vw_tesis.findAll({where:{idinscripcion: req.params.idinscripcion }});
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: tesises
            })
        }
    })
})

routes.get('/get/:idtesis', verificaToken, async (req, res) => {
    const tesises = await tesis.findByPk(req.params.idtesis)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: tesises
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        
        const tesises = await tesis.create(req.body, {
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
                    body: tesises
                });
            }
        })
    } catch (error) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})


routes.put('/put/:idtesis', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const tesises = await tesis.update(req.body, { where: { idtesis: req.params.idtesis } }, {
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
                    body: tesises
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idtesis', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const tesises = await tesis.destroy({ where: { idtesis: req.params.idtesis } }, {
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
                    body: tesises
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        t.rollback();
    }
})


module.exports = routes;