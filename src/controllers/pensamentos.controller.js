import { createServicePensamentos, findAllPensamentosService, countPensamentos, topPensamentoService, findByIdService, searchByTitleService, byUserService, updateService, eraseService, likePensamentoService, deleteLikePensamentoService, addCommentService } from "../services/pensamentos.service.js"


export const createPensamentos = async (req, res) => {

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

export const findAllPensamentos = async (req, res) => {

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

export const topPensamento = async (req,res) => {

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

export const findById = async(req,res) => {

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

export const searchByTitle = async (req, res) => {

    try{

        const {title} = req.query;

        const pensamento = await searchByTitleService(title);

        if(pensamento.length === 0){
            return res
            .status(400)
            .send({message: "There are no pensamentos with this title"})
        }

          return res.send({
            results : pensamento.map(pensamentosItem => ({
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
 
export const byUser = async (req, res) => {

    try{
        
        const id = req.userId
        const pensamento = await byUserService(id)

        return res.send({
            results : pensamento.map(pensamentosItem => ({
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

export const update = async (req, res) => {

try{

        const {title, text} = req.body
        const {id} = req.params

        
  if(!title && !text){
 return   res.status(400).send({message:"Submit at least one field for update the post"})
   }

   const pensamento = await findByIdService(id)



   if(String(pensamento.user._id) !==  String(req.userId)){
    return res.status(400).send({
        message: "You didn't update this post"
    })
   }

   await updateService(id, title, text)

   return res.send({message : "Post sucessfully update!"})



}catch(err){
    res.status(500).send(err.message)
}


}

export const erase = async(req, res) => {

    try{

        const {id} = req.params

      
         const pensamento = await findByIdService(id)
      
            
         if(String(pensamento.user._id) !==  String(req.userId)){
          return res.status(400).send({
              message: "You didn't delete this post"
          })
         }

         await eraseService(id)

         return res.send({message: "Post deleted sucessfully"})

    }catch(err){
    res.status(500).send(err.message)
}


}


export const likePensamento = async (req, res) =>{

    try{

        const {id} = req.params
        const userId = req.userId

        const pensamentoLiked = await likePensamentoService(id, userId)
        if(!pensamentoLiked){
            await deleteLikePensamentoService(id, userId)
            return res.status(200).send({message: "Like successfully removed"})
        }
        res.send({message: "Like done successfully"})

    }catch(err){
    res.status(500).send(err.message)
}

}

export const addComment = async (req,res) =>{

    try{

        const{id} = req.params
        const userId = req.userId
        const comment = req.body

        if(!comment){
            return res.status(400).send({
                message: "Write a message to comment!"
            })
        }

        await addCommentService(id, comment, userId)

        res.status(200).send({message:"Comment successfully completed!"})
    }catch(err){
    res.status(500).send(err.message)
}
}

