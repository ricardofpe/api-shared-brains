import Thoughts from "../models/Thoughts.js";

const createServiceThoughts = (body) => Thoughts.create(body)

const findAllThoughtsService = (offset, limit) => Thoughts.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");

const countThoughts = () => Thoughts.countDocuments();

const topThoughtService = () => Thoughts.findOne().sort({_id: -1}).populate("user")

const findByIdService = (id) => Thoughts.findById(id).populate("user") 

const searchByTitleService = (title) => Thoughts.find({
    title: {$regex: `${title || ""}`, $options: "i"},
}).sort({_id: -1}).populate("user")

const byUserService = (id) => Thoughts.find({user: id}).sort({_id: -1}).populate("user")

const updateService = (id, title, text) => 
Thoughts.findOneAndUpdate({_id: id}, {title, text}, {rawResult: true,})

const eraseService = (id) => Thoughts.findByIdAndDelete({_id: id})

const likeThoughtService = (idThought, userId) => Thoughts.findOneAndUpdate(
    {_id: idThought, "likes.userId": {$nin: [userId]}} ,
    {$push: {likes: {userId, created: new Date()}}}
)

const deleteLikeThoughtService = (idThought, userId) => Thoughts.findOneAndUpdate(
    {_id: idThought} ,
    {$pull: {likes: {userId}}}
)

const addCommentService = (idThought, comment, userId) => {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
 return   Thoughts.findOneAndUpdate(
    {_id: idThought},
    {
        $push: {
        comments:{ idComment, userId, comment,
    createdAt: new Date()}}
}
    )
}

const deleteCommentService = (idThought, idComment, userId) =>
Thoughts.findByIdAndUpdate(
    {_id: idThought},
    {$pull: {comments: {idComment, userId}}}
    
    )

export  {
    createServiceThoughts,
    findAllThoughtsService,
    countThoughts,
    topThoughtService,
    findByIdService,
    searchByTitleService,
    byUserService, 
    updateService,
    eraseService,
    likeThoughtService,
    deleteLikeThoughtService,
    addCommentService,
    deleteCommentService
}