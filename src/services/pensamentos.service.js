import Pensamentos from "../models/Pensamentos.js";

const createServicePensamentos = (body) => Pensamentos.create(body)

const findAllPensamentosService = (offset, limit) => Pensamentos.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");

const countPensamentos = () => Pensamentos.countDocuments();

const topPensamentoService = () => Pensamentos.findOne().sort({_id: -1}).populate("user")

const findByIdService = (id) => Pensamentos.findById(id).populate("user") 

const searchByTitleService = (title) => Pensamentos.find({
    title: {$regex: `${title || ""}`, $options: "i"},
}).sort({_id: -1}).populate("user")

const byUserService = (id) => Pensamentos.find({user: id}).sort({_id: -1}).populate("user")

const updateService = (id, title, text) => 
Pensamentos.findOneAndUpdate({_id: id}, {title, text}, {rawResult: true,})

const eraseService = (id) => Pensamentos.findByIdAndDelete({_id: id})

const likePensamentoService = (idPensamento, userId) => Pensamentos.findOneAndUpdate(
    {_id: idPensamento, "likes.userId": {$nin: [userId]}} ,
    {$push: {likes: {userId, created: new Date()}}}
)

const deleteLikePensamentoService = (idPensamento, userId) => Pensamentos.findOneAndUpdate(
    {_id: idPensamento} ,
    {$pull: {likes: {userId}}}
)

const addCommentService = (idPensamento, comment, userId) => {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
 return   Pensamentos.findOneAndUpdate(
    {_id: idPensamento},
    {
        $push: {
        comments:{ idComment, userId, comment,
    createdAt: new Date()}}
}
    )
}

const deleteCommentService = (idPensamento, idComment, userId) =>
Pensamentos.findByIdAndUpdate(
    {_id: idPensamento},
    {$pull: {comments: {idComment, userId}}}
    
    )

export  {
    createServicePensamentos,
    findAllPensamentosService,
    countPensamentos,
    topPensamentoService,
    findByIdService,
    searchByTitleService,
    byUserService, 
    updateService,
    eraseService,
    likePensamentoService,
    deleteLikePensamentoService,
    addCommentService,
    deleteCommentService
}