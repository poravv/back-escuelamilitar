const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const grados_arma = require("../model/model_grados_arma")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const grados_armaes = await database.query('select * from grados_arma order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: grados_armaes
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const grados_armaes = await grados_arma.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: grados_armaes
            })
        }

    })
})

routes.get('/get/:idgrados_arma', verificaToken, async (req, res) => {
    const grados_armaes = await grados_arma.findByPk(req.params.idgrados_arma)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: grados_armaes
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const grados_armaes = await grados_arma.create(req.body, {
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
                    body: grados_armaes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idgrados_arma', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const grados_armaes = await grados_arma.update(req.body, { where: { idgrados_arma: req.params.idgrados_arma } }, {
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
                    body: grados_armaes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idgrados_arma', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const grados_armaes = await grados_arma.destroy({ where: { idgrados_arma: req.params.idgrados_arma } }, {
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
                    body: grados_armaes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        t.rollback();
    }
})


module.exports = routes;