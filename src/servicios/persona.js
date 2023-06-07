const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const persona = require("../model/model_persona")
const vw_personas = require("../model/model_vw_personas")
const grados_arma = require("../model/model_grados_arma")
const ciudad = require("../model/model_ciudad")
const database = require('../database')
const{ QueryTypes }=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

routes.get('/getsql/', verificaToken, async (req, res) => {
    const rspersonas = await database.query('select * from persona order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rspersonas
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const rspersonas = await persona.findAll({include: [{ model: grados_arma },{ model: ciudad }]});
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rspersonas
            })
        }
    })
})

routes.get('/getvw/', verificaToken, async (req, res) => {
    
    const rspersonas = await vw_personas.findAll();
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rspersonas
            })
        }
    })
})

routes.get('/get/:idpersona', verificaToken, async (req, res) => {
    const rspersonas = await persona.findByPk(req.params.idpersona)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rspersonas
            });
        }


    })
})

routes.get('/likePersona/:documento', verificaToken, async (req, res) => {
    const rspersonas = await persona.findAll({where:{
        documento: {
            [Op.like]: `${req.params.documento}%`
          }
    }})
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rspersonas
            });
        }
    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    console.log(req.body)
    const t = await database.transaction();
    
    try {
        const rspersonas = await persona.create(req.body, {
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
                    body: rspersonas
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idpersona', verificaToken, async (req, res) => {

    console.log(req.params.idpersona)
    console.log(req.body)
    const t = await database.transaction();
    try {
        const rspersonas = await persona.update(req.body, { where: { idpersona: req.params.idpersona } }, {
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
                    body: rspersonas
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idpersona', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const rspersonas = await persona.destroy({ where: { idpersona: req.params.idpersona } }, {
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
                    body: rspersonas
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        t.rollback();
    }
})


module.exports = routes;