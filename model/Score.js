import mongoose from "mongoose"

const schema = new mongoose.Schema({
    lesson: String,
    first: {
        type: Number,
        default: -1
    },
    second: {
        type: Number,
        default: -1
    },
    third: {
        type: Number,
        default: -1
    },
    fourth: {
        type: Number,
        default: -1
    },
    fifth: {
        type: Number,
        default: -1
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
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongoose.model('Score', schema)