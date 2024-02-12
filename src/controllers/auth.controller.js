import bcrypt from 'bcrypt'
import {loginService, generateToken} from '../services/auth.service.js'


const login = async (req, res) =>{

   try{ const {email, password} = req.body;

    const user = await loginService(email)

    if(!user){
        return res.status(404).send({message:"User or Password not found"})
     }

     const passwordIsValid = bcrypt.compareSync(password, user.password)

     if(!passwordIsValid){
        return res.status(404).send({message:"User or Password not found"})
     }

     const token = generateToken(user.id)

     

    res.status(200).send({token})}catch(err){
        res.status(500).send(err.message)
    }
}

export  {login}