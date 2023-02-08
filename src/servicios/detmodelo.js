const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const det_modelo = require("../model/model_detmodelo")
const modelo = require("../model/model_modelo")
const marca = require("../model/model_marca")
const proveedor = require("../model/model_proveedor")
const sucursal = require("../model/model_sucursal")
const database = require('../database')
const verificaToken = require('../middleware/token_extractor');
const{DataTypes}=require("sequelize")
require("dotenv").config()

routes.get('/getsucursal/:idsucursal', verificaToken, async (req, res) => {
    try {
        const det_modelos = await det_modelo.findAll({where: { idsucursal: req.params.idsucursal,estado: 'AC' },
            include:[
                {model:marca},
                {model:proveedor},
                {model:sucursal},
                {model:modelo},
            ]
        }
        );

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error" });
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: det_modelos
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.json({ error: "Error" });
    }
});

routes.get('/getestadistica/', verificaToken, async (req, res) => {
    //console.log('Entra en getestadistica----------------')
    try {
        const modelos = await database.query(`select * from estadistica `,{type: DataTypes.SELECT})
        
        //console.log(modelos);

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: modelos[0]
            })
        }
    })
    } catch (error) {
        res.json({error: "Error catch ",error});
    }
});

routes.get('/getinfoplaya/', verificaToken, async (req, res) => {
    //console.log('Entra en getestadistica----------------')
    try {
        const det_modelos = await database.query(`select * from vw_info_playa `,{type: DataTypes.SELECT})
        
        //console.log(det_modelos[0]);

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: det_modelos[0]
            })
        }
    })
    } catch (error) {
        res.json({error: "Error catch ",error});
    }
})

routes.get('/gettotal/:idsucursal', verificaToken, async (req, res) => {
    try {
        const det_modelos = await det_modelo.findAll({where: { idsucursal: req.params.idsucursal },
            include:[
                {model:marca},
                {model:proveedor},
                {model:sucursal},
                {model:modelo}
            ]
        }
        );

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error" });
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: det_modelos
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.json({ error: "Error" });
    }
});

routes.get('/get/:iddet_modelo', verificaToken, async (req, res) => {
    try {

        if (req.params.iddet_modelo) {
            //const det_modelos = await det_modelo.findByPk(req.params.iddet_modelo);
            const query = `select * from det_modelo where iddet_modelo = ${req.params.iddet_modelo} and estado ='AC'`;
            const det_modelos = await database.query(query,
                {
                    model: det_modelo,
                    mapToModel: true // pass true here if you have any mapped fields
                });

            //console.log(det_modelos);

            jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
                if (err) {
                    res.json({ error: "Error" });
                } else {
                    res.json({
                        mensaje: "successfully",
                        authData: authData,
                        body: det_modelos
                    })
                }
            })
        } else {
            res.send("Error iddet_modelo null")
        }

    } catch (error) {
        res.json({ error: "Error" });
    }
})

routes.post('/post/', verificaToken, async (req, res) => {
    //console.log(req.body)
    const t = await database.transaction();
    try {
        const det_modelos = await det_modelo.create(req.body, { transaction: t });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error" });
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro almacenado",
                    authData: authData,
                    body: det_modelos
                })
            }
        })
    } catch (error) {
        //console.log('Error catch', error);
        t.rollback();
        res.json({ error: "Error" });
    }

})

routes.put('/put/:iddet_modelo', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const det_modelos = await det_modelo.update(req.body, { where: { iddet_modelo: req.params.iddet_modelo } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error" });
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro actualizado",
                    authData: authData,
                    body: det_modelos
                })
            }
        })
    } catch (error) {
        res.json({ error: "error catch" });
        t.rollback();
    }
})

routes.put('/inactiva/:iddet_modelo', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        //Captura parametro
        const { cantidad, iddet_modelo, estado } = req.body;
        //Query de actualizacion de cabecera
        const query = `update det_modelo set cantidad_total=(cantidad_total - ${cantidad})  where iddet_modelo = ${iddet_modelo}`;
        await database.query(query, {
            transaction: t
        });
        //Inactivacion de detalle
        const det_modelos = await det_modelo.update({ estado }, { where: { iddet_modelo: req.params.iddet_modelo } }, {
            transaction: t
        });

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error" });
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro actualizado",
                    authData: authData,
                    body: det_modelos
                })
            }
        })
    } catch (error) {
        t.rollback();
        res.json({ error: "error catch" });
    }
});

routes.delete('/del/:iddet_modelo', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const det_modelos = await det_modelo.destroy({ where: { iddet_modelo: req.params.iddet_modelo } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({ error: "Error" });
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro eliminado",
                    authData: authData,
                    body: det_modelos
                })
            }
        })
    } catch (error) {
        res.json({ error: "error catch" });
        t.rollback();
    }

})

module.exports = routes;