// events rutes: /api/events

const {Router} = require('express')
const {validarJWT}=require('../middlewares/validar-jwt')
const {getEventos,crearEvento,actualizarEvento,eliminarEvento}=require('../controllers/events')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {isDate}=require('../helpers/isDate')

const router = Router()

//validar cualquier peticion

router.use(validarJWT)

//obtener eventos, tiene que pasar por la validacion del JWT

router.get('/',getEventos)

//crear un nuevo evento

router.post('/new',[//midellwares
    check('title','el titulo es obligatorio').not().notEmpty(),
    check('start','fecha de inicio es obligatorio').custom(isDate),
    check('end','fecha de finalizar es obligatorio').custom(isDate),
    validarCampos

],crearEvento)


//actualizar evento

router.put('/:id',actualizarEvento)

//borrar evento

router.delete('/:id',eliminarEvento)

module.exports = router
