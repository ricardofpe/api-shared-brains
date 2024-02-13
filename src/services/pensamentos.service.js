import Pensamentos from "../models/Pensamentos.js";

const createServicePensamentos = (body) => Pensamentos.create(body)

const findAllPensamentosService = () => Pensamentos.find();

export  {
    createServicePensamentos,
    findAllPensamentosService
}