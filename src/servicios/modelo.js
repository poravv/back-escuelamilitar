const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const modelo = require("../model/model_modelo")
const database = require('../database')
const{DataTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const modeloes = await database.query('select * from modelo order by descripcion asc',{type: DataTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: modeloes
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const modeloes = await modelo.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: modeloes
            })
        }

    })
})

routes.get('/get/:idmodelo', verificaToken, async (req, res) => {
    const modeloes = await modelo.findByPk(req.params.idmodelo)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: modeloes
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const modeloes = await modelo.create(req.body, {
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
                    body: modeloes
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idmodelo', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const modeloes = await modelo.update(req.body, { where: { idmodelo: req.params.idmodelo } }, {
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
                    body: modeloes
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idmodelo', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const modeloes = await modelo.destroy({ where: { idmodelo: req.params.idmodelo } }, {
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
                    body: modeloes
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;