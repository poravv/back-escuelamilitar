const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const materia = require("../model/model_materia")
const vw_mat_cnv = require("../model/model_vw_mat_cnv")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const materiaes = await database.query('select * from materia order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: materiaes
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const materiaes = await materia.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: materiaes
            })
        }
    })
})

routes.get('/get/:idmateria', verificaToken, async (req, res) => {
    const materiaes = await materia.findByPk(req.params.idmateria)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: materiaes
            });
        }


    })
})

 
routes.get('/getmatcnv/:idconvocatoria', verificaToken, async (req, res) => {
    const materiaes = await vw_mat_cnv.findAll({where: { idconvocatoria:req.params.idconvocatoria }});
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: materiaes
            })
        }
    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const materiaes = await materia.create(req.body, {
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
                    body: materiaes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idmateria', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const materiaes = await materia.update(req.body, { where: { idmateria: req.params.idmateria } }, {
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
                    body: materiaes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idmateria', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const materiaes = await materia.destroy({ where: { idmateria: req.params.idmateria } }, {
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
                    body: materiaes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        t.rollback();
    }
})


module.exports = routes;