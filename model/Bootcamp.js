import mongoose from "mongoose"

const schema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    time: Date,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true})

export default mongoose.model('Bootcamp', schema)