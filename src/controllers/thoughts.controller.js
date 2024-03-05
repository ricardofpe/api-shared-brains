import { createServiceThoughts, findAllThoughtsService, countThoughts, topThoughtService, findByIdService, searchByTitleService, byUserService, updateService, eraseService, likeThoughtService, deleteLikeThoughtService, addCommentService, deleteCommentService } from "../services/thoughts.service.js"


export const createThoughts = async (req, res) => {

    try{

        const {title, text} = req.body

        if(!title || !text){
         res.status(400).send({message:"Submit all fields for registration"})
        }


        await createServiceThoughts({

            title,
            text,
            user: req.userId

        })
        res.send(201)

    }catch(err){
        res.status(500).send(err.message)
    }



}

export const findAllThoughts = async (req, res) => {

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

    const thoughts = await findAllThoughtsService(offset, limit);
    const total = await countThoughts();
    const currentUrl = req.baseUrl

    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

 if(thoughts.length === 0){
    return res.status(400).send({message: "There are no registred thoughts"})
   }
    res.send({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,

        results : thoughts.map(thoughtsItem => ({
            id: thoughtsItem._id,
            title: thoughtsItem.title,
            text: thoughtsItem.text,
            createdAt: thoughtsItem.createdAt,
            likes: thoughtsItem.likes,
            comments: thoughtsItem.comments,
            name : thoughtsItem.user.name,
            username: thoughtsItem.user.username
        }))
    })

    }catch(err){
        res.status(500).send(err.message)
    }


}

export const topThought = async (req,res) => {

    try{ const thought = await topThoughtService();

    if(!thought){
        return res.status(400).send({message:"There is no registred post"})
    }

    res.send({
        thoughts:{
        id: thought._id,
            title: thought.title,
            text: thought.text,
            createdAt: thought.createdAt,
            likes: thought.likes,
            comments: thought.comments,
            name : thought.user.name,
            username: thought.user.username
        }
    })
}catch(err){
    res.status(500).send(err.message)
}

}

export const findById = async(req,res) => {

    try{
        const {id} = req.params

        const thought = await findByIdService(id)

        return res.send({
            thoughts:{
                id: thought._id,
                    title: thought.title,
                    text: thought.text,
                    createdAt: thought.createdAt,
                    likes: thought.likes,
                    comments: thought.comments,
                    name : thought.user.name,
                    username: thought.user.username
                }

        })

    }catch(err){
    res.status(500).send(err.message)
}

}

export const searchByTitle = async (req, res) => {

    try{

        const {title} = req.query;

        const thought = await searchByTitleService(title);

        if(thought.length === 0){
            return res
            .status(400)
            .send({message: "There are no thoughts with this title"})
        }

          return res.send({
            results : thought.map(thoughtsItem => ({
                id: thoughtsItem._id,
                title: thoughtsItem.title,
                text: thoughtsItem.text,
                createdAt: thoughtsItem.createdAt,
                likes: thoughtsItem.likes,
                comments: thoughtsItem.comments,
                name : thoughtsItem.user.name,
                username: thoughtsItem.user.username
            }))
        })


    }catch(err){
    res.status(500).send(err.message)
}

}
 
export const byUser = async (req, res) => {

    try{
        
        const id = req.userId
        const thought = await byUserService(id)

        return res.send({
            results : thought.map(thoughtsItem => ({
                id: thoughtsItem._id,
                title: thoughtsItem.title,
                text: thoughtsItem.text,
                createdAt: thoughtsItem.createdAt,
                likes: thoughtsItem.likes,
                comments: thoughtsItem.comments,
                name : thoughtsItem.user.name,
                username: thoughtsItem.user.username
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

   const thought = await findByIdService(id)



   if(String(thought.user._id) !==  String(req.userId)){
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

      
         const thought = await findByIdService(id)
      
            
         if(String(thought.user._id) !==  String(req.userId)){
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


export const likeThought = async (req, res) =>{

    try{

        const {id} = req.params
        const userId = req.userId

        const thoughtLiked = await likeThoughtService(id, userId)
        if(!thoughtLiked){
            await deleteLikeThoughtService(id, userId)
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
        const {comment} = req.body

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

export const deleteComment = async (req,res) =>{
   
    try{

        
        const{idThought, idComment} = req.params
        const userId = req.userId
    

       

      const commentDeleted =  await deleteCommentService(idThought, idComment ,userId)

      const commentFinder = commentDeleted.comments.find(
        comment => comment.idComment === idComment
      )

      if(!commentFinder){
        return res.status(404).send({message:"Comment not found!"})
      }

      if(commentFinder.userId !== userId){
        return res.status(400).send({message:"You can't delete this comment!"})
      }

        res.status(200).send({message:"Comment successfully removed!"})

    }catch(err){
    res.status(500).send(err.message)
}
}
