const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const cargos = require("../model/model_cargos")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()

routes.get('/getsql/', verificaToken, async (req, res) => {
    const res_cargos = await database.query('select * from cargos order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: res_cargos
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    const res_cargos = await cargos.findAll();
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: res_cargos
            })
        }
    })
})

routes.get('/get/:idcargos', verificaToken, async (req, res) => {
    const res_cargos = await cargos.findByPk(req.params.idcargos)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: res_cargos
            });
        }
    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const res_cargos = await cargos.create(req.body, {
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
                    body: res_cargos
                });
            }
        })
    } catch (error) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})


routes.put('/put/:idcargos', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const res_cargos = await cargos.update(req.body, { where: { idcargos: req.params.idcargos } }, {
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
                    body: res_cargos
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idcargos', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const res_cargos = await cargos.destroy({ where: { idcargos: req.params.idcargos } }, {
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
                    body: res_cargos
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        t.rollback();
    }
})


module.exports = routes;