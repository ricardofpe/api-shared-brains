import mongoose from "mongoose";

const thoughtsSchema = new mongoose.Schema({

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

const thoughts = mongoose.model("thoughts", thoughtsSchema)

export default thoughts;