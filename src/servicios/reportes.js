const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const vw_reporte_mat = require("../model/model_vw_reporte_materia")
const vw_certificado_cab = require("../model/model_vw_certificado_cab")
const database = require('../database')
const { QueryTypes } = require("sequelize")
const verificaToken = require('../middleware/token_extractor');
const { parse } = require('dotenv');
require("dotenv").config()

routes.get('/getconvocatoria/:anho1/:anho2/:estado', verificaToken, async (req, res) => {
    try {
        let convocatorias = [];
        if (req.params.anho1.toString() != '0' && req.params.anho2.toString() != '0' && req.params.estado.toString() != '0') {
            convocatorias = await database.query(`select * from vw_convocatoria_rep where idanho_lectivo between ${req.params.anho1} and  ${req.params.anho2} and estado = '${req.params.estado}'  order by idconvocatoria asc`, { type: QueryTypes.SELECT })
        } else if (req.params.anho1.toString() != '0' && req.params.anho2.toString() != '0' && req.params.estado.toString() == '0') {
            convocatorias = await database.query(`select * from vw_convocatoria_rep where idanho_lectivo between ${req.params.anho1} and  ${req.params.anho2}  order by idconvocatoria asc`, { type: QueryTypes.SELECT })
        } else if (req.params.anho1.toString() != '0' && req.params.anho2.toString() == '0' && req.params.estado.toString() != '0') {
            //convocatorias = await convocatoria.findAll({where: { idanho_lectivo:req.params.anho1, estado: req.params.estado }, order: ['idconvocatoria','ASC']})
            convocatorias = await database.query(`select * from vw_convocatoria_rep where idanho_lectivo = ${req.params.anho1} and estado = '${req.params.estado}'  order by idconvocatoria asc`, { type: QueryTypes.SELECT })
        } else if (req.params.anho1.toString() == '0' && req.params.anho2.toString() != '0' && req.params.estado.toString() == '0') {
            convocatorias = await database.query(`select * from vw_convocatoria_rep where idanho_lectivo = ${req.params.anho2} order by idconvocatoria asc`, { type: QueryTypes.SELECT })
        }
        else if (req.params.anho1.toString() == '0' && req.params.anho2.toString() == '0' && req.params.estado.toString() == '0') {
            convocatorias = await database.query(`select * from vw_convocatoria_rep order by idconvocatoria asc`, { type: QueryTypes.SELECT })
        }
        else if (req.params.anho1.toString() == '0' && req.params.anho2.toString() == '0' && req.params.estado.toString() != '0') {
            convocatorias = await database.query(`select * from vw_convocatoria_rep where estado = '${req.params.estado}' order by idconvocatoria asc`, { type: QueryTypes.SELECT })
        }
        //convocatorias = await convocatoria.findAll({include: [{ model: planificacion,include: [{ model: curso },] },{ model: turno },]});

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => { if (err) { res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err }); } else { res.json({ mensaje: "successfully", authData: authData, body: convocatorias }) } })
    } catch (error) { res.json({ error: "Error" }); }
});

routes.get('/getreportegral/:idconvocatoria/', verificaToken, async (req, res) => {
    try {
        //console.log(req.params.idconvocatoria)
        //const rs_evaluaciones = await vw_reporte_gral.findAll({ where: { idconvocatoria: [req.params.idconvocatoria, 'Convocatoria'] } });
        //const rs_evaluaciones = await vw_reporte_gral.findAll();
        const rs_evaluaciones = await database.query(`select mv.* from (select @parametro:=${req.params.idconvocatoria} p) param , vw_reporte_general mv`, { type: QueryTypes.SELECT })
        //const rs_evaluaciones = await database.query(`select * from vw_reporte_general where idconvocatoria = ${req.params.idconvocatoria}`, { type: QueryTypes.SELECT })
        //console.log(rs_evaluaciones)
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) { res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err }); }
            else { res.json({ mensaje: "successfully", authData: authData, body: rs_evaluaciones }) }
        });
    } catch (err) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        //console.log(err)
    }
})


routes.get('/getcertevaluacion/:idconvocatoria/:idinscripcion', verificaToken, async (req, res) => {
    try {
        const rs_evaluaciones = await database.query(`select * from  vw_evaluaciones where idconvocatoria= ${req.params.idconvocatoria} and idinscripcion=${req.params.idinscripcion}`, { type: QueryTypes.SELECT });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: rs_evaluaciones
                })
            }
        })
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
    }
})

routes.get('/getevalmat/:idconvocatoria/:idmateria/:tipo', verificaToken, async (req, res) => {
    try {
        console.log(req.params.idconvocatoria,req.params.idmateria,req.params.tipo)
        await database.query(`select * from vw_evaluacion_acta where idconvocatoria= ${req.params.idconvocatoria} and idmateria=${req.params.idmateria} `, { type: QueryTypes.SELECT }).then((rs_evaluaciones) => {
            //console.log(rs_evaluaciones)
            jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
                if (err) {
                    res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
                } else {
                    res.json({
                        mensaje: "successfully",
                        authData: authData,
                        body: rs_evaluaciones
                    })
                }
            })
        });
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
    }
})

routes.get('/getactacab/:idconvocatoria/:idmateria', verificaToken, async (req, res) => {
    try {
        console.log(req.params.idconvocatoria,req.params.idmateria,req.params.tipo)
        await database.query(`select * from vw_acta_cab where idconvocatoria= ${req.params.idconvocatoria} and idmateria=${req.params.idmateria} `, { type: QueryTypes.SELECT }).then((rs_evaluaciones) => {
            //console.log(rs_evaluaciones)
            jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
                if (err) {
                    res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
                } else {
                    res.json({
                        mensaje: "successfully",
                        authData: authData,
                        body: rs_evaluaciones
                    })
                }
            })
        });
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
    }
})

routes.get('/getEstudiantes/:idconvocatoria', verificaToken, async (req, res) => {
    try {
        console.log(req.params.idconvocatoria,req.params.idmateria,req.params.tipo)
        await database.query(`select * from vw_estudiantes_cert where idconvocatoria= ${req.params.idconvocatoria} `, { type: QueryTypes.SELECT }).then((rs_evaluaciones) => {
            //console.log(rs_evaluaciones)
            jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
                if (err) {
                    res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
                } else {
                    res.json({
                        mensaje: "successfully",
                        authData: authData,
                        body: rs_evaluaciones
                    })
                }
            })
        });
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
    }
})

routes.get('/getrescabena/:idconvocatoria', verificaToken, async (req, res) => {
    try {
        console.log(req.params.idconvocatoria,req.params.idmateria,req.params.tipo)
        await database.query(`select * from vw_res_ena_cab where idconvocatoria= ${req.params.idconvocatoria} `, { type: QueryTypes.SELECT }).then((rs_evaluaciones) => {
            //console.log(rs_evaluaciones)
            jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
                if (err) {
                    res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
                } else {
                    res.json({
                        mensaje: "successfully",
                        authData: authData,
                        body: rs_evaluaciones
                    })
                }
            })
        });
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
    }
})

routes.get('/getreportemat/:idconvocatoria/:idmateria', verificaToken, async (req, res) => {
    try {
        const rs_evaluaciones = await vw_reporte_mat.findAll({ where: { idconvocatoria: req.params.idconvocatoria, idmateria: req.params.idmateria } });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) { res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err }); }
            else { res.json({ mensaje: "successfully", authData: authData, body: rs_evaluaciones }) }
        });
    } catch (err) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        //console.log(err)
    }
})

routes.get('/getcertificado1ro/:idinscripcion', verificaToken, async (req, res) => {
    try {
        const rs_evaluaciones = await database.query(`select * from vw_certificado_1ro where idinscripcion= ${req.params.idinscripcion} `, { type: QueryTypes.SELECT })
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) { res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err }); }
            else { res.json({ mensaje: "successfully", authData: authData, body: rs_evaluaciones }) }
        });
    } catch (err) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        //console.log(err)
    }
})

routes.get('/getcertcab/:idinscripcion/', verificaToken, async (req, res) => {
    try {
        const rs_evaluaciones = await vw_certificado_cab.findAll({ where: { idinscripcion: req.params.idinscripcion } });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) { res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err }); }
            else { res.json({ mensaje: "successfully", authData: authData, body: rs_evaluaciones }) }
        });
    } catch (err) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        //console.log(err)
    }
})

module.exports = routes;