// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { obtenerRestaurantes,
    obtenerRestaurante,
    obtenerRestauranteNombreMesa,
    obtenerRestauranteNombreSala,
    agregarRestaurante,
    editarRestaurante,
    eliminarRestaurante } = require('../controllers/Restaurantes.controllers');
//LLAMAMOS NUESTRO METODO DE VERIFICAR TOKEN.
const { TokenOK } = require('../middlewares/auth');
const { validadorRestaurantes } = require('../validators/Restaurantes.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//RUTAS DE RECETAS
router.get('/', obtenerRestaurantes);
router.post('/', [TokenOK, validadorRestaurantes], agregarRestaurante);
router.get('/:id', obtenerRestaurante);
router.get('/sala/:name', obtenerRestauranteNombremesa);
router.get('/mesa/:name', obtenerRestauranteNombreMesa);
router.put('/:id',TokenOK, editarRestaurante);
router.delete('/:id',TokenOK, eliminarRestaurante);
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;