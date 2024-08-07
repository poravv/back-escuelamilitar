const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const cargos = require("../model/model_cargos")
const database = require('../database')
const{QueryTypes}=require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()

routes.get('/get/:idsucursal', verificaToken, async (req, res) => {
    const ciudades = await database.query(`select * from vw_persona_cargos where idsucursal= ${req.params.idsucursal}`,{type: QueryTypes.SELECT})
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: ciudades
            })
        }
    })
})

routes.get('/getcargo/', verificaToken, async (req, res) => {
    const ciudades = await database.query(`select * from cargos where estado='AC'`,{type: QueryTypes.SELECT})
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: ciudades
            })
        }
    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const {idpersona,idcargos,idanho_lectivo,idsucursal} = req.body;
    try {
        const ciudades = await database.query(`insert into persona_cargos (idpersona,idcargos,idanho_lectivo,estado,idsucursal) values (${idpersona},${idcargos},${idanho_lectivo},'AC',${idsucursal})`,{type: QueryTypes.INSERT});

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                console.log('Guarda')
                res.json({
                    mensaje: "Registro almacenado",
                    authData: authData,
                    body: ciudades
                });
            }
        })
    } catch (error) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
    }
})



routes.put('/put/', verificaToken, async (req, res) => {

    const {idpersona,idcargos,idanho_lectivo,estado,idsucursal} = req.body;
    try {
        const ciudades = await database.query(`update persona_cargos set estado = '${estado}' where idpersona= ${idpersona} and idcargos = ${idcargos} and idanho_lectivo= ${idanho_lectivo} and idsucursal=${idsucursal}`,{type: QueryTypes.UPDATE});

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                console.log('Actualiza')
                res.json({
                    mensaje: "Registro almacenado",
                    authData: authData,
                    body: ciudades
                });
            }
        })
    } catch (error) {
        res.json({error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador"});
    }
})


module.exports = routes;