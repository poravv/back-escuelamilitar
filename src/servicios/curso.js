const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const curso = require("../model/model_curso")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const cursoes = await database.query('select * from curso order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: cursoes
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const cursoes = await curso.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: cursoes
            })
        }

    })
})

routes.get('/getcursoinscripcion/:idpersona', verificaToken, async (req, res) => {
    try {
        await database.query(`select * from vw_cursos_inscripcion where idpersona = ${req.params.idpersona}`, { type: QueryTypes.SELECT }).then((cursos) => {

            jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
                if (err) {
                    res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
                } else {
                    res.json({
                        mensaje: "successfully",
                        authData: authData,
                        body: cursos
                    })
                }
            })
        });
        
    } catch (error) {
        res.json({ error: "Error ", error });
    }
})

routes.get('/get/:idcurso', verificaToken, async (req, res) => {
    const cursoes = await curso.findByPk(req.params.idcurso)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: cursoes
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const cursoes = await curso.create(req.body, {
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
                    body: cursoes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idcurso', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const cursoes = await curso.update(req.body, { where: { idcurso: req.params.idcurso } }, {
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
                    body: cursoes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idcurso', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const cursoes = await curso.destroy({ where: { idcurso: req.params.idcurso } }, {
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
                    body: cursoes
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        t.rollback();
    }
})


module.exports = routes;