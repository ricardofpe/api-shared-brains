import { createServicePensamentos, findAllPensamentosService, countPensamentos, topPensamentoService, findByIdService } from "../services/pensamentos.service.js"


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

        let{limit, offset} = req.query

        limit = Number(limit)
        offset = Number(offset)

        if(!limit){
            limit = 5
        }
        
        
        if(!offset){
            offset = 0
        }

    const pensamentos = await findAllPensamentosService(offset, limit);
    const total = await countPensamentos();
    const currentUrl = req.baseUrl

    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

 if(pensamentos.length === 0){
    return res.status(400).send({message: "There are no registred pensamentos"})
   }
    res.send({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,

        results : pensamentos.map(pensamentosItem => ({
            id: pensamentosItem._id,
            title: pensamentosItem.title,
            text: pensamentosItem.text,
            likes: pensamentosItem.likes,
            comments: pensamentosItem.comments,
            name : pensamentosItem.user.name,
            username: pensamentosItem.user.username
        }))
    })

    }catch(err){
        res.status(500).send(err.message)
    }


}

const topPensamento = async (req,res) => {

    try{ const pensamento = await topPensamentoService();

    if(!pensamento){
        return res.status(400).send({message:"There is no registred post"})
    }

    res.send({
        pensamentos:{
        id: pensamento._id,
            title: pensamento.title,
            text: pensamento.text,
            likes: pensamento.likes,
            comments: pensamento.comments,
            name : pensamento.user.name,
            username: pensamento.user.username
        }
    })
}catch(err){
    res.status(500).send(err.message)
}

}

const findById = async(req,res) => {

    try{
        const {id} = req.params

        const pensamento = await findByIdService(id)

        return res.send({
            pensamentos:{
                id: pensamento._id,
                    title: pensamento.title,
                    text: pensamento.text,
                    likes: pensamento.likes,
                    comments: pensamento.comments,
                    name : pensamento.user.name,
                    username: pensamento.user.username
                }

        })

    }catch(err){
    res.status(500).send(err.message)
}

}

export {createPensamentos, findAllPensamentos, topPensamento, findById }