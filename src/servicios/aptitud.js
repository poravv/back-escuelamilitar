const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const aptitud_militar = require("../model/model_aptitud_militar")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const aptitud_militares = await database.query('select * from aptitud_militar order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: aptitud_militares
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const aptitud_militares = await aptitud_militar.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: aptitud_militares
            })
        }

    })
})

routes.get('/get/:idaptitud_militar', verificaToken, async (req, res) => {
    const aptitud_militares = await aptitud_militar.findByPk(req.params.idaptitud_militar)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: aptitud_militares
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        
        const aptitud_militares = await aptitud_militar.create(req.body, {
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
                    body: aptitud_militares
                });
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})


routes.put('/put/:idaptitud_militar', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const aptitud_militares = await aptitud_militar.update(req.body, { where: { idaptitud_militar: req.params.idaptitud_militar } }, {
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
                    body: aptitud_militares
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idaptitud_militar', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const aptitud_militares = await aptitud_militar.destroy({ where: { idaptitud_militar: req.params.idaptitud_militar } }, {
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
                    body: aptitud_militares
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;