import Pensamentos from "../models/Pensamentos.js";

const createServicePensamentos = (body) => Pensamentos.create(body)

const findAllPensamentosService = (offset, limit) => Pensamentos.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");

const countPensamentos = () => Pensamentos.countDocuments();

export  {
    createServicePensamentos,
    findAllPensamentosService,
    countPensamentos
}