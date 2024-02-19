import Pensamentos from "../models/Pensamentos.js";

const createServicePensamentos = (body) => Pensamentos.create(body)

const findAllPensamentosService = (offset, limit) => Pensamentos.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");

const countPensamentos = () => Pensamentos.countDocuments();

const topPensamentoService = () => Pensamentos.findOne().sort({_id: -1}).populate("user")

const findByIdService = (id) => Pensamentos.findById(id).populate("user") 

export  {
    createServicePensamentos,
    findAllPensamentosService,
    countPensamentos,
    topPensamentoService,
    findByIdService
}