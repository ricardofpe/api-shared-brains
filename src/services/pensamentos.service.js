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

export  {
    createServicePensamentos,
    findAllPensamentosService,
    countPensamentos,
    topPensamentoService,
    findByIdService,
    searchByTitleService,
    byUserService, 
    updateService,
    eraseService
}