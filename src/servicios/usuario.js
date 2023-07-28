const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const usuariomodel = require("../model/model_usuario")
const sucursal = require("../model/model_sucursal")
const persona = require("../model/model_persona")
const database = require('../database')
const verificaToken = require('../middleware/token_extractor')
const md5 = require('md5')
require("dotenv").config()

routes.post('/login/', async (req, res) => {

    try {
        //console.log(req.body)
        const { usuario, password } = req.body;
        console.log(password)
        console.log(usuario);
        await usuariomodel.findOne(
            {
                where: { usuario: usuario, password: md5(password) },
                include: [
                    //{ model: sucursal },
                    { model: persona }
                ]
            }).then((rsusuario) => {
                console.log('usuario: ', rsusuario)
                if (rsusuario != 0) {
                    jwt.sign({ rsusuario }, process.env.CLAVESECRETA
                        , { expiresIn: '12h' }//Para personalizar el tiempo para expirar
                        , (err, token) => {
                            return res.json({
                                "error": "false",
                                token,
                                body: rsusuario
                            });
                        });
                } else {
                    return res.status(400).json(
                        {
                            "error": "true",
                            "mensaje": "Usuario no existe"
                        }
                    );
                }
            });

    } catch (error) {
        return res.status(400).json(
            {
                "error": "true",
                "mensaje": `Error de login: ${error}`
            }
        );
    }
})

routes.get('/get/', verificaToken, async (req, res) => {
    const usuarios = await usuariomodel.findAll({
        include: [
            { model: sucursal },
            { model: persona }
        ]
    })

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: usuarios
            })
        }
    })
    //res.json(usuarios)
})

routes.get('/get/:idusuario', verificaToken, async (req, res) => {
    const usuarios = await usuariomodel.findByPk(req.params.idusuario, {
        include: [
            { model: sucursal },
            { model: persona }
        ]
    })
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: usuarios
            })
        }
    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    req.body.password = md5(req.body.password);
    try {
        const usuarios = await usuariomodel.create(req.body, { transaction: t })
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro almacenado",
                    authData: authData,
                    body: usuarios
                })
            }
        })
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        t.rollback();
    }

})

routes.put('/put/:idusuario', verificaToken, async (req, res) => {
    const t = await database.transaction();
    //console.log(req.body)
    req.body.password = md5(req.body.password);
    try {
        await usuariomodel.update(req.body, { where: { idusuario: req.params.idusuario, password: md5(req.body.passwordAnterior) }, transaction: t }).then((rs) => {
            console.log('RS: ', rs)
            jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
                if (err) {
                    res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
                } else {
                    //console.log(rs)
                    if (rs[0] === 0) {
                        //console.log('Error')
                        res.json({ error: "Error de Contraseña Actual" });
                    } else {
                        //console.log('Actualizado')
                        t.commit();
                        res.json({
                            mensaje: "Usuario actualizado correctamente",
                            authData: authData,
                            body: rs
                        })
                    }


                }
            })
        });

    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        t.rollback();
    }
})

routes.delete('/del/:idusuario', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const usuarios = await usuariomodel.destroy({ where: { idusuario: req.params.idusuario }, transaction: t })
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador", err });
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro eliminado",
                    authData: authData,
                    body: usuarios
                })
            }
        })
    } catch (error) {
        res.json({ error: "Error en el servidor, verifique los campos cargados, sino contacte con el administrador" });
        t.rollback();
    }
})


module.exports = routes;