// rutas del usuario /auth
// host + /api/auth
const {Router}= require('express')
const{check}=require('express-validator')
const router = Router()
const {validarCampos} = require('../middlewares/validar-campos')
const {crearUsuario,revalidarToken,loginUsuario}=require('../controllers/auth')
const {validarJWT}=require('../middlewares/validar-jwt')

 

router.post(
    '/new',
    [//middelwares 
        check('name','el nombre es obligatorio').not().isEmpty(),//validar nombre 
        check('email','el email es obligatorio').isEmail(), //validar correo electronico
        check('password','el password es obligatorio').isLength({min:6}),
        validarCampos
    ],
    crearUsuario)

router.post('/',
[//middelwares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos

],loginUsuario) 

router.get('/renew',validarJWT,revalidarToken)
    //sanidad seguridad eduacion 
module.exports=[
router
]  
