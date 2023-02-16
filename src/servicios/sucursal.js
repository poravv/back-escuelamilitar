const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const sucursal = require("../model/model_sucursal")
const ciudad = require("../model/model_ciudad")
const database = require('../database')
const{DataTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const sucursales = await database.query('select * from sucursal order by descripcion asc',{type: DataTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: sucursales
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    
    const sucursales = await sucursal.findAll({include: ciudad})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: sucursales
            })
        }

    })
})

routes.get('/get/:idsucursal', verificaToken, async (req, res) => {
    const sucursales = await sucursal.findByPk(req.params.idsucursal)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: sucursales
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const sucursales = await sucursal.create(req.body, {
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
                    body: sucursales
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idsucursal', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const sucursales = await sucursal.update(req.body, { where: { idsucursal: req.params.idsucursal } }, {
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
                    body: sucursales
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idsucursal', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const sucursales = await sucursal.destroy({ where: { idsucursal: req.params.idsucursal } }, {
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
                    body: sucursales
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;