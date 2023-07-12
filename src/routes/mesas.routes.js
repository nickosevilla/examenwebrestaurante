// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { obtenerMesas,
    obtenerMesa,
    obtenerMesaNombre,
    agregarMesa,
    editarMesa,
    eliminarMesa } = require('../controllers/mesas.controllers');

//LLAMAMOS NUESTRO METODO DE VERIFICAR TOKEN.
const { TokenOK } = require('../middlewares/auth');
const { validadorMESAS } = require('../validators/mesas.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//RUTAS DE CATEGORIAS
router.get('/', obtenerMesas);
router.post('/', TokenOK, [validadorMesas], agregarMesa);
router.get('/nombre/:name', obtenerMesaNombre);
router.get('/:id', obtenerMesa);
router.put('/:id',TokenOK, editarMesa);
router.delete('/:id',TokenOK, eliminarMesa);
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;