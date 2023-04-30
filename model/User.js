import mongoose from "mongoose"

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: String,
    hashedPassword: String,
    fullname: String,
    phone: String,
    avatarUrl: String,
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

export default mongoose.model('User', schema)