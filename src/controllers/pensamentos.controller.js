import { createServicePensamentos, findAllPensamentosService } from "../services/pensamentos.service.js"


const createPensamentos = async (req, res) => {

    try{

        const {title, text} = req.body

        if(!title || !text){
         res.status(400).send({message:"Submit all fields for registration"})
        }


        await createServicePensamentos({

            title,
            text,
            user: req.userId

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