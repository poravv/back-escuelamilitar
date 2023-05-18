const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const evaluaciones = require("../model/model_evaluaciones")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()


routes.get('/getsql/', verificaToken, async (req, res) => {
    const rs_evaluaciones = await database.query('select * from evaluaciones order by descripcion asc',{type: QueryTypes.SELECT})

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rs_evaluaciones
            })
        }
    })
})



routes.get('/getevaluaciones/:idconvocatoria/:idinscripcion', verificaToken, async (req, res) => {
    try {
        await database.query(`CALL p_genera_proceso(${req.params.idconvocatoria},@a);`);
    const rs_evaluaciones = await database.query(`select mv.* from (select @cnv_evaluacion:=${req.params.idconvocatoria}) cnv, (select @idinsc_evaluacion:=${req.params.idinscripcion}) ins, vw_det_evaluaciones mv`,{type: QueryTypes.SELECT});
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rs_evaluaciones
            })
        }
    })
    } catch (error) {
        res.json({error: "error catch"});
    }
})


routes.get('/getproceso/:idconvocatoria/:idmateria', verificaToken, async (req, res) => {
    try {
        await database.query(`CALL p_genera_proceso(${req.params.idconvocatoria},@a);`);
    const rs_evaluaciones = await database.query(`select * from vw_proceso where idconvocatoria= ${req.params.idconvocatoria} and idmateria=${req.params.idmateria}`,{type: QueryTypes.SELECT});
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rs_evaluaciones
            })
        }
    })
    } catch (error) {
        res.json({error: "error catch"});
    }
})


routes.get('/get/', verificaToken, async (req, res) => {
    
    const rs_evaluaciones = await evaluaciones.findAll();

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rs_evaluaciones
            })
        }

    })
})

routes.get('/get/:idevaluaciones', verificaToken, async (req, res) => {
    const rs_evaluaciones = await evaluaciones.findByPk(req.params.idevaluaciones)
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});;
        } else {
            
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: rs_evaluaciones
            });
        }


    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    
    try {
        const rs_evaluaciones = await evaluaciones.create(req.body, {
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
                    body: rs_evaluaciones
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback')
        t.rollback();
    }
})

routes.put('/put/:idinscripcion/:idmateria', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const rs_evaluaciones = await evaluaciones.update(req.body, 
            { where: { idmateria: req.params.idmateria,idinscripcion: req.params.idinscripcion } }, 
            {transaction: t
            });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro actualizado",
                    authData: authData,
                    body: rs_evaluaciones
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        console.log('Rollback update')
        t.rollback();
    }
})

routes.delete('/del/:idevaluaciones', verificaToken, async (req, res) => {

    const t = await  database.transaction();
    
    try {
        const rs_evaluaciones = await evaluaciones.destroy({ where: { idevaluaciones: req.params.idevaluaciones } }, {
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
                    body: rs_evaluaciones
                })
            }
        })
    } catch (er) {
        res.json({error: "error catch"});
        t.rollback();
    }
})


module.exports = routes;