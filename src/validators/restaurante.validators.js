//  Importamos el validador de express
const { check } = require('express-validator');
const { validadorResultado } = require('../utils/validacion');
// Validar los datos de entrada de las peticiones
const validadorRestaurantes = [
    check('reserva')
        .exists().withMessage("Favor ingresar reserva en JSON")
        .notEmpty().withMessage("Favor este campo no puede venir vacio")
        .isLength({min: 3, max: 64}).withMessage("Favor este campo debe etnner un minimo de 3 y un maximo 64"),
    check('descripcion')
        .exists().withMessage("Favor ingresar descripcion en JSON")
        .notEmpty().withMessage("Favor este campo no puede venir vacio"),
    check('id_mesa')
        .exists().withMessage("Favor ingresar id del mesa en JSON")
        .notEmpty().withMessage("Favor este campo no puede venir vacio")
        .isInt({min: 1}).withMessage("Favor solo debe ingresar numeros"),
    (req, res, next) => {
        return validadorResultado(req, res, next);
    }
];
//  Exportamos el validador
module.exports = {
    validadorRestaurantes
}