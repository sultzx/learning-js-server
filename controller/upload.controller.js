
import User from "../model/User.js"

export const uploadAvatar = async (req, res) => {
    const url = `/uploads/avatars/${req.file.filename}`
    await User.updateOne({
        _id: req.userId
    }, {
        avatarUrl: url
    })
    res.json({
        url: url
    })
}
