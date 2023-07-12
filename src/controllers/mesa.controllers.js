// Obtenemos el metodo Router de express
const database = require('../config/basedatos');id_mesa
const { httpError } = require('../utils/error');
const { obtenerData } = require('../middlewares/auth');

//CONTROLADORES
const obtenerMesas = async (req, res) => {
    try {
        const db = await database();
        //  METODO PARA OBTENER TODOS LOS MESAS DISPNIBLES
        const sql = `
            SELECT 
                a.id_mesa,
                a.nombre, 
                a.vendido       
            FROM mesa a
        `;
        //EJECUTAMOS LA CONSULTA
        const [rows] = await db.query(sql);
        //RETORNAMOS LA RESPUESTA
        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        httpError(res, "ERROR_GET_MESAS");
    }
}
//  AGREGAMOS UNA MESA
const agregarMesa = async (req, res) => {

    try {
        const { nombre, borrar, vendido } = req.body;
        const token = req.headers.authorization;
        const { usuario } = obtenerData(token.split(" ").pop());
        const id_usuario = usuario.id;
        const db = await database();

        const sql = `
            INSERT INTO mesa(nombre, borrar, vendido, id_usu)
            VALUES('${nombre}',${borrar}, ${vendido}, ${id_usuario})
        `;
        // EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);
        if (!resultado.insertId) {
            return res.json(
                {
                    "ok": false,
                    "msj": "no has seleccionado una Mesa"
                }
            );
        }
        res.json(
            {
                "ok": true
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_POST_Mesa")
    }
}
//  METODO PARA OBTENER UNA MESA
const obtenerMesa = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await database();

        const sql = `
        SELECT 
                a.id_mesa,
                a.nombre, 
                a.borrar,
                a.vendido       
            FROM mesa a
        WHERE a.id_mesa = ${id}
    `;

        const [rows] = await db.query(sql);

        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-Mesa")
    }
}
//  METODO PARA OBTENER UNA MESA RESERVADA POR NOMBRE
const obtenerMesaNombre = async (req, res) => {
    try {
        const { name } = req.params;
        const db = await database();

        const sql = `
        SELECT 
                a.id_mesa,
                a.nombre, 
                a.borrar,
                a.vendido       
            FROM mesa a
        WHERE a.nombre like '${name}%'

    `;
       //EJECUTAMOS LA CONSULTA 
       const [rows] = await db.query(sql);
       res.json(
           {
               "ok": true,
               data: rows
           }
       );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-DEL-MESA")
    }
}
// Metodos para editar
const editarMesa = async (req, res) => {

    try {
        const { id } = req.params;
        const { nombre, borrar} = req.body;
        const db = await database();
        const sql = `
            UPDATE mesa SET
                nombre = '${nombre}',
                borrar = ${borrar}
            WHERE id_mesa = ${id}
        `;
        //EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);
        if (!resultado.affectedRows) {
            return httpError(res, "Error al Editar la Mesa");
        }
        //RETORNAMOS LA RESPUESTA
        return res.json({
            "ok": true,
            "msj": "Se edito correctamente la Mesa"
        });
    } catch (error) {
        return httpError(res, "Ocurrio algo en PUT Mesa");
    }
}
// Metodos para eliminar
const eliminarMesa = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM mesa WHERE id_mesa = ${id}`;
        const [resultado] = await db.query(sql);

        if (!resultado.affectedRows) {
            return httpError(res, "No se pudo eliminar la mesa");
        }

        return res.json(
            {
                "ok": true,
                "msj": "La mesa fue eliminada correctamente"
            }
        )

    } catch (error) {
        return httpError(res, "ERROR EN DELETE MESA");
    }
}
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = {  
    obtenerMesas,
    obtenerMesa,
    obtenerMesaNombre,
    agregarMesa,
    editarMesa,
    eliminarMesa           
}