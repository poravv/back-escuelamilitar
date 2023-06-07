const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const reportes_emitidos = require("../model/model_reportes_emitidos")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()

routes.get('/getsql/', verificaToken, async (req, res) => {
    const reportes_emitidoses = await database.query('select * from reportes_emitidos order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: reportes_emitidoses
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const reportes_emitidoses = await reportes_emitidos.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: reportes_emitidoses
            })
        }

    })
})

routes.get('/get/:idreportes_emitidos', verificaToken, async (req, res) => {
    const reportes_emitidoses = await reportes_emitidos.findByPk(req.params.idreportes_emitidos)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: reportes_emitidoses
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        
        const reportes_emitidoses = await reportes_emitidos.create(req.body, {
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
                    body: reportes_emitidoses
                });
            }
        })
    } catch (error) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})


routes.put('/put/:idreportes_emitidos', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const reportes_emitidoses = await reportes_emitidos.update(req.body, { where: { idreportes_emitidos: req.params.idreportes_emitidos } }, {
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
                    body: reportes_emitidoses
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idreportes_emitidos', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const reportes_emitidoses = await reportes_emitidos.destroy({ where: { idreportes_emitidos: req.params.idreportes_emitidos } }, {
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
                    body: reportes_emitidoses
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        t.rollback();
    }
})


module.exports = routes;