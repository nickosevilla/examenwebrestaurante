// Obtenemos el metodo Router de express
const database = require('../config/basedatos');
const { httpError } = require('../utils/error');
const { obtenerData } = require('../middlewares/auth');
const { matchedData } = require('express-validator');
//CONTROLADORES
const obtenerRestaurantes = async (req, res) => {

    try {
        const db = await database();

        const sql = `
        SELECT 
                c.id_restaurante,
                c.reserva,
                c.descripcion,
                c.borrar,
                c.id_mesa
            FROM restaurante c
        `;

        const [rows] = await db.query(sql);

        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        httpError(res, "ERROR_GET_RESTAURANTE");
    }
}
//  METODO PARA AGREGAR UN RESTAURANTE
const agregarRestaurante = async (req, res) => {

    try {
        const body = matchedData(req);
        const { reserva, descripcion, borrar,id_mesa } = req.body;
        const token = req.headers.authorization;
        const { usuario } = obtenerData(token.split(" ").pop());
        const id_usu = usuario.id;
        const db = await database();
        const sql = `
            INSERT INTO Restaurante(reserva, descripcion, borrar, id_mesa, id_user)
            VALUES('${reserva}', '${descripcion}', ${borrar}, ${id_mesa}, ${id_usu})
        `;
        const [resultado] = await db.query(sql);
        if (!resultado.insertId) {
            return res.json(
                {
                    "ok": false,
                    "msj": "no creaste nada en Restaurante"
                }
            );
        }
        res.json(
            {
                "ok": true
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_POST_Restaurante")
    }
}
//  METODO PARA OBTENER UN Restaurante POR ID 
const obtenerRestaurante = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await database();
        const sql = `
        SELECT 
                c.id_restaurante,
                c.reserva,
                c.descripcion,
                c.borrar,
                c.id_mesa
            FROM restaurante c
        WHERE c.id_restaurante = ${id}
    `;
        const [rows] = await db.query(sql);
        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_DATO-DE-Restaurante")
    }
}

//  METODO PARA EDITAR RESTAURANTE
const editarRestaurante = async (req, res) => {

    try {
        const { id } = req.params;
        const body = matchedData(req);
        const { reserva, descripcion, borrar, id_mesa} = req.body;
        const db = await database();
        const sql = `
            UPDATE restaurante SET
                reserva = '${reserva}',
                descripcion = '${descripcion}',
                borrar = '${borrar}',
                id_mesa = '${id_mesa}'
            WHERE id_restaurante = ${id}
        `;
        //EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);        
        if (!resultado.affectedRows) {
            return httpError(res, "Error al Editar Restaurante");
        }
        //RETORNAMOS LA RESPUESTA
        return res.json({
            "ok": true,
            "msj": "Se edito correctamente Restaurante"
        });

    } catch (error) {
        return httpError(res, "Error al editar Restaurante");
    }
}
// METODO PARA ELIMINAR UN RESTAURANTE
const eliminarRestaurante = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM Restaurante WHERE id_restaurante = ${id}`;
        const [resultado] = await db.query(sql);

        if (!resultado.affectedRows) {
            return httpError(res, "No se pudo eliminar nada de Restaurante");
        }

        return res.json(
            {
                "ok": true,
                "msj": "Restaurante fue eliminado correctamente"
            }
        )

    } catch (error) {
        return httpError(res, "ERROR EN DELETE RESTAURANTE");
    }
}
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = { 
    obtenerRestaurantes,
    obtenerRestaurante,
    obtenerRestauranteNombreMesa,
    agregarRestaurante,
    editarRestaurante,
    eliminarRestaurante                
}   
