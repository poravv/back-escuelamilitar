const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const marca = require("../model/model_marca")
const database = require('../database')
const{DataTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const marcaes = await database.query('select * from marca order by descripcion asc',{type: DataTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: marcaes
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const marcaes = await marca.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: marcaes
            })
        }

    })
})

routes.get('/get/:idmarca', verificaToken, async (req, res) => {
    const marcaes = await marca.findByPk(req.params.idmarca)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: marcaes
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const marcaes = await marca.create(req.body, {
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
                    body: marcaes
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idmarca', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const marcaes = await marca.update(req.body, { where: { idmarca: req.params.idmarca } }, {
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
                    body: marcaes
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idmarca', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const marcaes = await marca.destroy({ where: { idmarca: req.params.idmarca } }, {
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
                    body: marcaes
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;