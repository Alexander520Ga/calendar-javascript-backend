const {response} = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt')



   const crearUsuario = async (req,res=response)=>{
  
   const {email,password}=req.body;

   try {
        
    let usuario = await Usuario.findOne({email});
    console.log(usuario)
    if (usuario) {
        return res.status(400).json({
            ok:false,
            msg:'ese correo ya esta en uso'
        })
    }

     usuario = new Usuario(req.body)

     //incriptar contraseña
     const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password,salt);

   await usuario.save()
   //generar JWT

   const token = await generarJWT(usuario.id,usuario.name)

    res.status(201).json({
        ok:true ,
        uid: usuario.id,
        name:usuario.name,
        token
    })
    
   } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'por favor hable con el administrador'
        })

   }

    
}

const loginUsuario = async(req,res=response)=>{

    const {email,password}= req.body


    try {


    const  usuario = await Usuario.findOne({email});

    console.log(usuario)
    
    if (!usuario) {
        return res.status(400).json({
            ok:false,
            msg:'ese correo no esta en uso'
        })
    }



    //confirmar los password

    const validPassword = bcrypt.compareSync(password, usuario.password)

    if(!validPassword){

        return res.json({
            ok:false,
            msg:'password incorrecto'
        })

    }

        //generar nuestro JWT

       //generar JWT

   const token = await generarJWT(usuario.id,usuario.name)


        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
            
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'por favor hable con el administrador'
        })
    }

    


    
    
}



const revalidarToken = async(req,res=response)=>{


        const uid = req.uid
        const name = req.name



        //generar token
        const token = await generarJWT(uid,name)

    res.json({
        ok:true  ,
      token
    })
}

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}

/*




*/ 