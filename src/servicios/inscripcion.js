const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const inscripcion = require("../model/model_inscripcion")
const persona = require("../model/model_persona")
const convocatoria = require("../model/model_convocatoria")
const planificacion = require("../model/model_planificacion")
const curso = require("../model/model_curso")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const inscripciones = await database.query('select * from inscripcion',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: inscripciones
            })
        }
    })
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const inscripciones = await inscripcion.findAll({include: [
        { model: persona},
        { model: convocatoria,include: [
            { model: planificacion,include: [
                { model: curso },
            ] },
        ]  },],
        order:[
            //['numero','DESC']
            ['numero','ASC']
        ]});

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: inscripciones
            })
        }

    })
});


routes.get('/getconv/:idconvocatoria', verificaToken, async (req, res) => {
    
    const inscripciones = await inscripcion.findAll({where: { idconvocatoria: req.params.idconvocatoria},
        include: [
            { model: persona},
            { model: convocatoria,include: [
                { model: planificacion,include: [
                    { model: curso },
                ] },
            ]  },],
            order:[
                //['numero','DESC']
                ['numero','ASC']
            ]});
    
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: inscripciones
            })
        }
    })
});

routes.get('/get/:idinscripcion', verificaToken, async (req, res) => {
    const inscripciones = await inscripcion.findByPk(req.params.idinscripcion)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: inscripciones
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const inscripciones = await inscripcion.create(req.body, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                t.commit();
                //console.log('Commitea')
                res.json({
                    mensaje: "Registro almacenado",
                    authData: authData,
                    body: inscripciones 
                });
            }
            
        })
        await database.query(`update convocatoria set cupo=(cupo-1) where idconvocatoria = ${req.body.idconvocatoria}`);
        //await database.query(`CALL p_carga_cuotas(${inscripciones.idinscripcion},${req.body.idpersona},${req.body.idconvocatoria},@a)`);

    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idinscripcion', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        const inscripciones = await inscripcion.update(req.body, { where: { idinscripcion: req.params.idinscripcion } }, {
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
                    body: inscripciones
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idinscripcion', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const inscripciones = await inscripcion.destroy({ where: { idinscripcion: req.params.idinscripcion } }, {
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
                    body: inscripciones
                })
            }
        })
    } catch (er) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
        t.rollback();
    }
})


module.exports = routes;