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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongoose.model('Score', schema)