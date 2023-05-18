const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const vw_reporte_gral = require("../model/model_vw_reporte_general")
const vw_reporte_mat = require("../model/model_vw_reporte_materia")
const convocatoria = require("../model/model_convocatoria")
//const vw_convocatoria = require("../model/model_vwconvocatoria")
const planificacion = require("../model/model_planificacion")
const curso = require("../model/model_curso")
const turno = require("../model/model_turno")
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

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => { if (err) { res.json({ error: "Error ", err }); } else { res.json({ mensaje: "successfully", authData: authData, body: convocatorias }) } })
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
            if (err) { res.json({ error: "Error ", err }); }
            else { res.json({ mensaje: "successfully", authData: authData, body: rs_evaluaciones }) }
        });
    } catch (err) {
         res.json({ error: "error catch" });
         //console.log(err)
        }
})

routes.get('/getreportemat/:idconvocatoria/:idmateria', verificaToken, async (req, res) => {
    try {
        const rs_evaluaciones = await vw_reporte_mat.findAll({ where: { idconvocatoria: req.params.idconvocatoria, idmateria:req.params.idmateria  } });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) { res.json({ error: "Error ", err }); }
            else { res.json({ mensaje: "successfully", authData: authData, body: rs_evaluaciones }) }
        });
    } catch (err) {
         res.json({ error: "error catch" });
         //console.log(err)
        }
})

module.exports = routes;