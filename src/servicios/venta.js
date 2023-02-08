const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const venta = require("../model/model_venta")
const usuario = require("../model/model_usuario")
const cliente = require("../model/model_cliente")
const detventa = require("../model/model_detventa")
const det_modelo = require("../model/model_detmodelo")
const modelo = require("../model/model_modelo")
const database = require('../database');
const verificaToken = require('../middleware/token_extractor')
const{DataTypes}=require("sequelize")
require("dotenv").config()

routes.get('/get/', verificaToken, async (req, res) => {
    const ventas = await venta.findAll({
        include: [
            { model: usuario },
            { model: cliente },
            { model: detventa , 
                include:[{ model:det_modelo,
                        include:[{ model:modelo }] 
                        }]
            },
        ]
    })

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: ventas
            })
        }
    })
});

routes.get('/getestadistica/', verificaToken, async (req, res) => {
    //console.log('Entra en getestadistica----------------')
    try {
        const det_modelos = await database.query(`select * from estadistica_ventas `,{type: DataTypes.SELECT})
        
        console.log(det_modelos[0]);

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

routes.get('/getvenusu/:idusuario', verificaToken, async (req, res) => {
    try {
        const ventas = await venta.findAll({where: { idusuario: req.params.idusuario,estado: 'AC' },
            include: [
                { model: usuario },
                { model: cliente },
                { model: detventa , 
                    include:[{ model:det_modelo,
                            include:[{ model:modelo }] 
                            }]
                },
            ]
        })
    
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: ventas
                })
            }
        })
    } catch (error) {
        res.json({
            error: "error"
        })
    }
});

/*venta o retorno*/
routes.post('/operacionventa/:iddet_modelo-:operacion-:idusuario-:total', verificaToken, async (req, res) => {

    try {
        await database.query('CALL addventainventario('+req.params.iddet_modelo+',"'+req.params.operacion+'",'+req.params.idusuario+','+req.params.total+',@a)');

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({
                    error: "error"
                });
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                });
            }
        });
    } catch (error) {
        res.json({
            error: "error en operaciones"
        });
    }
});


routes.post('/verificaproceso/:idusuario-:tabla', verificaToken, async (req, res) => {

    try {
        await database.query(`CALL verificaProcesos(${req.params.idusuario},'${req.params.tabla}',@a)`);

        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error"});;
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                });
            }
        });
    } catch (error) {
        res.json({error: "error catch"});
    }
});



routes.get('/get/:idventa', verificaToken, async (req, res) => {
    const ventas = await venta.findByPk(req.params.idventa, {
        include: [
            { model: usuario },
            { model: cliente },
            { model: detventa , include:[{ model:det_modelo }]},
        ]
    })
    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: ventas
            })
        }
    })
})

routes.get('/getDet/', verificaToken, async (req, res) => {
    const ventas = await venta.findAll({
        include: [
            { model: usuario },
            { model: cliente },
            { model:detventa , include:[{ model:det_modelo }]},
        ]
    })

    jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
        if (err) {
            res.json({error: "Error ",err});
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: ventas
            })
        }
    })
})

routes.post('/post/', verificaToken, async (req, res) => {
    
    console.log(req.body);

    const t = await database.transaction();
    try {
        const ventas = await venta.create(req.body, { transaction: t })
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro almacenado",
                    authData: authData,
                    body: ventas
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        t.rollback();
    }

})

routes.put('/put/:idventa', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const ventas = await venta.update(req.body, { where: { idventa: req.params.idventa }, transaction: t })
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                t.commit();
                res.json({
                    mensaje: "Registro actualizado",
                    authData: authData,
                    body: ventas
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        t.rollback();
    }
})

routes.put('/inactiva/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        //Captura parametro 
        const { idventa, idusuario } = req.body;
        //Query de actualizacion de cabecera
        const query = `CALL inactivapedidoventa(${idventa},${idusuario},@a)`;
        console.log(query);

        await database.query(query, {
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
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        t.rollback();
    }

})

routes.delete('/del/:idventa', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const ventas = await venta.destroy({ where: { idventa: req.params.idventa }, transaction: t })
        jwt.verify(req.token, process.env.CLAVESECRETA, (err, authData) => {
            if (err) {
                res.json({error: "Error ",err});
            } else {
                t.transaction()
                res.json({
                    mensaje: "Registro eliminado",
                    authData: authData,
                    body: ventas
                })
            }
        })
    } catch (error) {
        res.json({error: "error catch"});
        t.rollback();
    }

})

module.exports = routes;