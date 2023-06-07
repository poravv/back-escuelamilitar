const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const detalle_documentos = require("../model/model_detalle_documentos")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const detalle_documentoses = await database.query('select * from detalle_documentos order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: detalle_documentoses
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const detalle_documentoses = await detalle_documentos.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: detalle_documentoses
            })
        }

    })
})

routes.get('/get/:iddetalle_documentos', verificaToken, async (req, res) => {
    const detalle_documentoses = await detalle_documentos.findByPk(req.params.iddetalle_documentos)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: detalle_documentoses
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const detalle_documentoses = await detalle_documentos.create(req.body, {
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
                    body: detalle_documentoses
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:iddetalle_documentos', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const detalle_documentoses = await detalle_documentos.update(req.body, { where: { iddetalle_documentos: req.params.iddetalle_documentos } }, {
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
                    body: detalle_documentoses
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:iddetalle_documentos', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const detalle_documentoses = await detalle_documentos.destroy({ where: { iddetalle_documentos: req.params.iddetalle_documentos } }, {
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
                    body: detalle_documentoses
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        t.rollback();
    }
})


module.exports = routes;