import mongoose from "mongoose"

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: String,
    hashedPassword: String,
    lastname: String,
    firstname: String,
    patronymic: String,
    phone: String,
    birthdate: Date,
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

export default mongoose.model('User', schema)