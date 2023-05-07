import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    scores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    }],
    total: {
        type: Number,
        default: 80
    },
    correct: {
        type: Number,
        default: 0
    },
    wrong: {
        type: Number,
        default: 0
    },
    completed: {
        type: Number,
        default: 0
    }
}
    , {
        timestamps: true
    })

export default mongoose.model('Rating', schema)
