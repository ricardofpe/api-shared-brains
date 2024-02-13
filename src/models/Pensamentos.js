import mongoose from "mongoose";

const PensamentosSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    likes: {
        type: Array,
        require: true
    },
    comments: {
        type: Array,
        require: true
    }
})

const Pensamentos = mongoose.model("Pensamentos", PensamentosSchema)

export default Pensamentos;