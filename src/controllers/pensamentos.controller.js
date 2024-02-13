import { createServicePensamentos, findAllPensamentosService } from "../services/pensamentos.service.js"


const createPensamentos = async (req, res) => {

    try{

        const {authorization} = req.headers

        if(!authorization){
            return res.send(401)
        }

        const parts = authorization.split(" ")

        const [schema, token] = parts

        if(parts.length !== 2){
            return res.send(401)
        }

        if(schema !== "Bearer"){
            return res.send(401)
        }

        const {title, text} = req.body

        if(!title || !text){
         res.status(400).send({message:"Submit all fields for registration"})
        }


        await createServicePensamentos({

            title,
            text,
            user: {_id: "65c68630c8bc6fc0bb31c5a2"}

        })
        res.send(201)

    }catch(err){
        res.status(500).send(err.message)
    }



}

const findAllPensamentos = async (req, res) => {

    try{
        
    const pensamentos = await findAllPensamentosService();
    
 if(pensamentos.length === 0){
    return res.status(400).send({message: "There are no registred pensamentos"})
   }
    res.send(pensamentos)

    }catch(err){
        res.status(500).send(err.message)
    }


}

export {createPensamentos, findAllPensamentos }