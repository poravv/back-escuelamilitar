const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const instructor = require("../model/model_instructor")
const persona = require("../model/model_persona")
const grados_arma = require("../model/model_grados_arma")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const instructores = await database.query('select * from instructor order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: instructores
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const instructores = await instructor.findAll(
        {include: [
                { model: persona ,include:[{ model:grados_arma,
                   // include:[{ model:modelo }] 
                    }]
                }
            ]
        });

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: instructores
            })
        }

    })
})

routes.get('/get/:idinstructor', verificaToken, async (req, res) => {
    const instructores = await instructor.findByPk(req.params.idinstructor)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: instructores
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    //console.log(req.params.idpersona)
    console.log(req.body)
    const t = await database.transaction();
    
    try {
        const instructores = await instructor.create(req.body, {
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
                    body: instructores
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idinstructor', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const instructores = await instructor.update(req.body, { where: { idinstructor: req.params.idinstructor } }, {
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
                    body: instructores
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idinstructor', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const instructores = await instructor.destroy({ where: { idinstructor: req.params.idinstructor } }, {
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
                    body: instructores
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;