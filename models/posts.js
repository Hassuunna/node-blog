import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    image: String,
    content: String,
    category: String,
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Posts', postSchema)