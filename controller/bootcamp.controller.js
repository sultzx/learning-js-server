import mongoose from "mongoose"
import Bootcamp from "../model/Bootcamp.js"
import User from "../model/User.js"

export const create = async (req, res) => {
    try {

        const { title, description, location, time } = req.body

        const document = new Bootcamp({
            title, description, location, time
        })

        const bootcamp = await document.save()

        res.status(200).json(bootcamp)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const participate = async (req, res) => {
    try {
        
        const {bootcampId} = req.body

        const userId = req.userId

        const bootcamp = await Bootcamp.findById(bootcampId).populate('members').exec()

        bootcamp.members.push(userId)

        await bootcamp.save()

        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getAllBootcamps = async (req, res) => {
    try {
        
        const bootcamps = await Bootcamp.find().populate('members').exec()

        res.status(200).json(bootcamps)

    } catch (error) {
        res.status(500).json(error.message)
    }
}